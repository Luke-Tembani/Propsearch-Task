'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../../api/AuthController/AuthController';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const nav = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    let data = {
      username:form.username,
      email:form.email,
      password:form.password,
      picture:null
    }

    let response = await registerUser(data);

    if(response === "success"){
      alert("User Registered Successfully, You can now login !");
      nav.push("/login");
    }else{
      alert("Failed to register, Please try again !");
    }

    

  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Register</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
        <button style={{marginTop:"20px"}} onClick={()=>nav.push("/login")}>Already Have An Account ? Login Now !</button>
      </div>
      <style>
      {`
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
