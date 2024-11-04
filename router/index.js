require("dotenv").config();
const router = require('express').Router();
const db = require('../config/config_db');
const axios = require("axios");


//Test Route
router.get("/",(req,res)=>{
    return res.status(200).json({message:"Hello There You're Connected !"});
});

// Profile Management
router.post("/update/profile", async (req, res) => {
    const userId = req.userId; 
    const { username, email, profile} = req.body;

    console.log(req.body);

    let updates = [];
    let params = [];

    if (username) {
        updates.push("username = ?");
        params.push(username);
    }
    if (email) {
        updates.push("email = ?");
        params.push(email);
    }
    if (profile) {
        updates.push("profile = ?");
        params.push(profile);
    }

   
    if (updates.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
    }

    params.push(userId);

    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

    try {
        // Execute the query
        db.query(sql, params, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database error", err });
            }

            // Check if any rows were affected
            if (results.affectedRows > 0) {
                return res.status(200).json({ message: "Profile updated successfully" });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});


router.post("/chats/history",(req,res)=>{
    const username = req.body.username;
    if(!username){
        return res.status(400).json({message:"No username specified !"});
    }
    //Calling Django Rest
    axios.post("http://localhost:8080/chats",{username}).then((response)=>{
        if(response.status === 200){
            return res.status(200).json({message:"success",chats:response.data})
        }
    })
    .catch((error)=>{
        console.log(error);
        return res.status(500).json({error});
    })
});






module.exports = router;