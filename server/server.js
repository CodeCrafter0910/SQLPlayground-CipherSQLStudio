const express = require("express");
const connectMongo = require("./config/db");
const cors = require("cors");
require("dotenv").config();
require("./config/postgres");
const queryRoutes = require("./routes/queryRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const hintRoutes = require("./routes/hintRoutes");
const attemptRoutes = require("./routes/attemptRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", queryRoutes);
app.use("/api", assignmentRoutes);
app.use("/api/hint", hintRoutes);
app.use("/api", attemptRoutes);

app.get("/", (req, res) => {
  res.send("CipherSQLStudio Backend Running");
});

connectMongo();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});