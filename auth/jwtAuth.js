const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

const token = req.header('Authorization').split(' ')[1];

if (!token) return res.status(401).json({ error: 'Access denied' });

try {
    console.log(token);
 const decoded = jwt.verify(token, "propsearchkey");

 req.userId = decoded.userId;

 next();

 } catch (error) {

 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;