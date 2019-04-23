import React from 'react';

let inputDetails={
  email:"",
  password:""
}
const onEmailChange=(event)=>{
  inputDetails.email = event.target.value;
}
const onPasswordChange=(event)=>{
  inputDetails.password = event.target.value;
}
const LoginForm = ({onRequestLogin}) =>{
  const login = ()=> {
    onRequestLogin(inputDetails)
  }
  return(
    <div>
      <input onChange={onEmailChange} type="email" placeholder="Email"/><br/>
      <input onChange={onPasswordChange} type="password" placeholder="Password"/><br/>
      <button onClick={login}>Submit</button>
    </div>
  );
}

export default LoginForm;
