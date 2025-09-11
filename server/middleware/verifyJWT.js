import jwt from 'jsonwebtoken';

// Middleware to verify JWT access token
const verifyJWT = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(' ')[1];

  // Verify the token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: err.message }); // e.g., TokenExpiredError
    }

    // Attach user info to request object for downstream middleware/routes
    req.user = decoded.userInfo.username;
    req.role = decoded.userInfo.role;

    next();
  });
};

export { verifyJWT };
