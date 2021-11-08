import React, {useState} from "react";
import axios from 'axios';
import './App.css';
import Profile from './Profile'
import {Route, withRouter, useHistory, Redirect} from "react-router-dom";


function Login() {
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [data, setData] = useState(null)
  const history = useHistory();
  let isSuccess, loginStatus;
  //Axios 
  const register = () => {
    axios({
      method: "post",
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res)=> console.log(res));
  }
  const login = () => {
    axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then(function (res) {
      console.log(res);
      isSuccess = (res.data == ("Succesfully Authenticated")); 
      if (isSuccess){
        toProfile();
      }
     // res.data == ("Succesfully Authenticated") ? <Redirect to ='/Profile' />: null 
    });

    
  }
  

  const getUser = () => {    
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/user",
    }).then((res)=> setData(res.data));
  }

  const toProfile = () => {
    history.push('/Profile');
  }

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input placeholder='username' onChange={e=>setRegisterUsername(e.target.value)}/>
        <input placeholder='password' onChange={e=>setRegisterPassword(e.target.value)}/>
        <button onClick = {register}>Submit</button>
      </div>
      <div>
        <h1>Login</h1>
        <input placeholder='username' onChange={e=>setLoginUsername(e.target.value)}/>
        <input placeholder='password' onChange={e=>setLoginPassword(e.target.value)}/>
        <button onClick = {login}>Submit</button>
        <div className = "wrapper">{isSuccess && <Redirect to ="/Profile" />}</div>
      </div>
      <div>
        <h1>Get User</h1>
        <button onClick = {getUser}>Submit</button>
        {
          data ? <h1>Welcome Back {data.username}</h1> : null
        }
      </div>

    </div>


  );
}

export default Login;
