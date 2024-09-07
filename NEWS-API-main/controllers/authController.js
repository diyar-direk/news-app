const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "your_jwt_secret"; // Secret key for JWT

module.exports.login = (req, res) => {
  const { username, password } = req.body;

  // Replace with your own user validation logic
  if (username === "user" && password === "password") {
    const user = { username: "user" }; // User payload
    const accessToken = jwt.sign(user, secret); // Generate JWT
    res.json({ accessToken }); // Send token in response
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
