require("dotenv").config();
import jwt from "jsonwebtoken";

const generateToken = (userId, email, roleId, lastName) => {
  
  try {
    return jwt.sign(
      { userId, email, roleId, lastName },
      process.env.JWT_SECRET,
      {
        expiresIn: "1800s",
      }
    );
  } catch (err) {
    console.log(err);
  }
  return null;
};

function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.tokenData = decoded;
    next();
  });
}

module.exports = {
  generateToken,
  validateToken,
};
