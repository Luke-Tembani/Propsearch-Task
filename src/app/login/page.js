'use client';
import React, { useState } from 'react';
import {loginUser} from "../../../api/AuthController/AuthController";
import { useRouter } from 'next/navigation';


export default function Login() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const nav = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();
    let data = {
      username,
      password
    }
    let response = await loginUser(data);

    console.log("******",response)

    if(response === "success"){
      alert("Login Successful");
      nav.push("/home");
    }else{
      alert("Failed to Authenticate !");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
        <button style={{marginTop:"20px"}} onClick={()=>nav.push("/register")}>Don't Have An Account? Register Here !</button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .form-box {
          max-width: 400px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          text-align: center;
        }
        input {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          margin-bottom: 15px;
        
        }
        button {
          width: 100%;
          padding: 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}
