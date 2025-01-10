const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConnection = require("./config/dbConfig");
const cors = require("cors");


const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());


app.use("/*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});