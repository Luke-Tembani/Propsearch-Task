'use client';
import React, { useState } from 'react';
import {updateUserData} from "../../../../api/UserProfileController/UserProfileController";

export default function ProfileManagement() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let data = {
      username:userData.name,
      password:userData.password,
      email:userData.email
    }

    let response = await updateUserData(data);

    if(response === "success"){
      alert("User Data Updated !");
    }else{
      alert("Failed to update user data");
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile Management</h2>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Changes</button>
      </form>

      <style>{`
        .profile-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-top: 15px;
        }

        input {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          width: 100%;
          padding: 10px;
          margin-top: 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
}
