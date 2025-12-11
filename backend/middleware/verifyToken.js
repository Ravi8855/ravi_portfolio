const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "somesecret";

module.exports = function (req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Missing token" });

  const token = header.split(" ")[1];

  // ⭐ 1) ALLOW FAKE TOKEN FOR DEVELOPMENT
  if (token === "sample-admin-token") {
    req.user = { id: "dev-admin", role: "admin" };
    return next(); // ⬅ IMPORTANT
  }

  // ⭐ 2) VERIFY REAL JWT TOKEN (PRODUCTION)
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;  // attach decoded user to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
