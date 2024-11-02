require("dotenv").config();
const authRoute = require('express').Router();
const bcrypt = require("bcrypt");
const db = require('../config/config_db');
const jwt = require("jsonwebtoken");



// User registration
authRoute.post('/register', async (req, res) => {
    try {
    const { username, password, email, profile } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (username,password, email, profile) VALUES (?,?,?,?)";
    const checkSql = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(checkSql,[username,email],(err,results)=>{
        if(err){
            return res.status(500).json({err});
        }else{
            if(results.length>0){
                return res.status(400).json({message:"User already exists !"})
            }else{
                db.query(sql,[username,hashedPassword,email,profile],(err,results)=>{
                    if(err){
                        console.log(err);
                        return res.status(400).json({err});
                    }else{
                        if (results.affectedRows == 1){
            
                     res.status(200).json({ message: 'User registered successfully' });
                        }else{
                     res.status(500).json({ message: 'Failed to register user' });
                        }
                    }
                })
            }
        }
    })

    } catch (error) {
    res.status(500).json({ message: 'Registration failed' , error});
    }
    });


// User login
authRoute.post('/login', async (req, res) => {
    try {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql,[username],async(err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({err});
        }else{
            if(results.length==1){
                console.log(results[0])
                const passwordMatch = await bcrypt.compare(password, results[0].password);
                if (!passwordMatch) {
                return res.status(401).json({ error: 'Authentication failed' });
                }
                const token = jwt.sign({ userId: results[0].id }, "propsearchkey", {
                    expiresIn: '1h',
                    });
                    return res.status(200).json({ token });
            }else{
                return res.status(401).json({ error: 'Authentication failed' });
            }
        }
    })
        } 
        catch (error) {
        res.status(500).json({ error: 'Login failed' });
        }


    });



module.exports = authRoute;