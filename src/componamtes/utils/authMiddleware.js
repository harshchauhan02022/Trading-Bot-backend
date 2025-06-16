const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; // .env file में define होना चाहिए

module.exports = (req, res, next) => {
 const authHeader = req.headers['authorization'];
 if (!authHeader || !authHeader.startsWith('Bearer ')) {
  return res.status(401).json({ error: 'Access denied' });
 }

 const token = authHeader.split(' ')[1];

 try {
  const decoded = jwt.verify(token, secretKey);
  req.user = decoded; // token से decoded user set करें
  next();
 } catch (err) {
  return res.status(401).json({ error: 'Access denied' });
 }
};
