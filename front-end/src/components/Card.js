import React from 'react';



const Card = (props) =>{
  return(
    <div className="dib br3 grow ma2">
      <img width="200px"  height="200px" alt="Art" src={`http://localhost:3001/images/${props.filename}`}/>
      <div>
        <h3>{props.name}</h3>

      </div>
    </div>
  );
}

export default Card;
