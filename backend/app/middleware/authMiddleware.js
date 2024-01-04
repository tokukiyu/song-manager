const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, "key");

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = authenticateUser;
