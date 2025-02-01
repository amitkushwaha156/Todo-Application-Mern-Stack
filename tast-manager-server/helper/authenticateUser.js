const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", ""); // Optional chaining
  //console.log("Token received:", token);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Attach user data to the request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authenticateUser;
