const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jswebtoken = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const secretJwtKey = "YOUR_SECRET_JWT_KEY";
const fs = require('fs')
const knex = require("knex")({
  client:"pg",
  connection:{
    host:"localhost",
    user:"postgres",
    password:"YOUR_SECRET_DB_PASSWORD",
    database:"postgres"
  },
  useNullAsDefault:true

});
const app = express();

const storage = multer.diskStorage({destination:"./public/uploads/",
                                    filename: function(req,file,cb){
                                      cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
                                    }});
app.use(cors());
app.use(bodyParser.json());

const upload = multer({storage}).single("artImage");

let login = []
let artpieces = []

const createToken =(email)=>{
  return jswebtoken.sign({email},secretJwtKey);
}
const verifytoken = (token)=>{
  let response = "";
  try{
    response = jswebtoken.verify(token,secretJwtKey);
  }catch(err){
    response = err;
  }
  return response;
}

app.post("/upload",(req,res)=>{
  res.redirect("http://localhost:3000");

  upload(req,res,(err)=>{
    if(err){
      res.send(err);
    }else{
      const token = req.body.token;
      const attemptedEmail = verifytoken(token).email;

      if(verifytoken(token).email){
        knex("login").select("*").where({email:attemptedEmail})
        .then(data=>{

          if(data.length>0){
            const artname = req.body.artName;
            const filename = req.file.filename;
            const email = attemptedEmail;
            knex("art").insert({email,filename,artname}).then(data=>data);

         }else{
           res.status(401);
           fs.unlinkSync(req.file.path);
        }
        });
      }else{
        res.status(401);
        fs.unlinkSync(req.file.path);
      }

    }

  });

});
app.post("/login",(req,res)=>{
  let email = req.body.email;
  let stringPassword = req.body.password;


  knex("login").select("*").where({email:email})
  .then(data=>{

    if(data.length>0){

      bcrypt.compare(stringPassword, data[0].hash, function(err, isCorrect) {
        if(isCorrect===true){
            res.json({message:"Login successful!",token:createToken(email)});
        }else{
          res.json({message:"Login failed!"});
        }
    });
   }else{
      const hash = bcrypt.hashSync(stringPassword, saltRounds);
      knex("login").insert({email,hash}).then(data=>data);

      res.json({message:"Registration successful!",token:createToken(email)});
  }
  });





});
app.get("/art",(req,res)=>{
  knex("art").select("*").then(data=>{

    res.json(data)
  });
});
app.get("/images/:filename",(req,res)=>{
  res.sendFile(`${__dirname}/public/uploads/${req.params.filename}`);
});

app.listen(3001);
