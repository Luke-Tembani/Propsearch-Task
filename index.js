require("dotenv").config();
const express = require("express");
const router = require("./router");
const app = express();
const PORT = process.env.PORT;
const verifyToken = require("./auth/jwtAuth");
const authRoutes = require("./router/authRoutes");


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/auth",authRoutes);

app.use("/",verifyToken, router);

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON ${PORT}`);
});
module.exports = app;
