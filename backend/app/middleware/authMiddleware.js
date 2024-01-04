const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Get the token from the cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, 'key');

    // Attach the user ID to the request for future middleware to use
    req.userId = decodedToken.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = authenticateUser;
