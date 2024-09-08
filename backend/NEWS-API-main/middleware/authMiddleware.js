// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "your_jwt_secret"; // Secret key for JWT

function authenticateToken(req, res, next) {
    
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer TOKEN"


  if (token == null) return res.sendStatus(401); // If no token, respond with 401

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid, respond with 403
    req.user = user; // Attach user info to request
    next(); // Proceed to next middleware or route handler
  });
}

module.exports = authenticateToken;
