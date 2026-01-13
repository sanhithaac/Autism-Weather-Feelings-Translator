const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/emotions", require("./routes/emotions"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
