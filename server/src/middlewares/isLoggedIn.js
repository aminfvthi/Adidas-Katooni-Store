import jwt from "jsonwebtoken";

const SECRET = "wf9y58wh4w45x97w4h5ohw4s";

export async function isLoggedIn(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).json({ massage: "access denied" });
  try {
    const decodedToken = jwt.verify(token, SECRET);
    const userId = decodedToken._id;
    req.userId = userId;
    next();
  } catch (error) {
    res.status(400).json({ massage: "invalid token" });
  }
}
