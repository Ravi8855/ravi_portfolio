const app = express();

// 1) CORS FIX
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// 2) Body parser
app.use(express.json());

// 3) Static files
app.use("/uploads", express.static("uploads"));

// 4) Routes (AFTER CORS)
app.use("/api", projectRoutes(verifyToken));
app.use("/api", messageRoutes(verifyToken));
app.use("/api", certificateRoutes(verifyToken));
