const admin = require("./firebase-admin");

const verifyToken = async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No ID token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token", error });
  }
};

module.exports = verifyToken;
