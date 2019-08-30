const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
