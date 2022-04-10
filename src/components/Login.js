import React, { useState } from 'react'
import { useNavigate } from'react-router-dom'


const Login = (props) => {

  const [credentials, setCredentials] = useState({email:"", password:""})
  let history = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/loginUser",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged In Successfully", "success");
      history("/");
    }
    else{
      props.showAlert("You Entered INCORRECT credentials.....MORON", "danger");
    }
  
  }

  const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }


  return (
      <div className="container my-10">
        <h2 className="mt-3 container">Login To Continue To iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email}  name="email"  aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
  )
}

export default Login