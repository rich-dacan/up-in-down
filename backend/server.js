const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors"); // comunicação entre diferentes urls front e back;
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running in port: ${PORT}! 🚀`);
});
