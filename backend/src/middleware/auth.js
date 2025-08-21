import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    // Support both Authorization Bearer and httpOnly cookie token
    const bearer = req.headers.authorization?.split(" ")[1];
    const token = bearer || req.cookies?.token;

    console.log("🔍 Auth middleware - Headers:", req.headers.authorization);
    console.log("🔍 Auth middleware - Cookie:", req.cookies?.token);
    console.log("🔍 Auth middleware - Token found:", !!token);

    if (!token) {
      console.log("❌ No token found");
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded successfully:", decoded);
    
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.log("❌ Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
