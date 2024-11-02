require("dotenv").config();
const router = require('express').Router();
const bcrypt = require("bcrypt");
const db = require('../config/config_db');
const jwt = require("jsonwebtoken");


//Test Route
router.get("/",(req,res)=>{
    return res.status(200).json({message:"Hello There You're Connected !"});
})


module.exports = router;