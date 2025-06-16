const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function authenticate(req, res, next) {
 const authHeader = req.headers.authorization;

 if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(403).json({ error: "Access denied" });
 }

 const token = authHeader.split(" ")[1];

 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded; // attaches user to request
  next();
 } catch (err) {
  return res.status(403).json({ error: "Access denied" });
 }
};
