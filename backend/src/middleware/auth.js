import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    // Support both Authorization Bearer and httpOnly cookie token
    const bearer = req.headers.authorization?.split(" ")[1];
    const token = bearer || req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
