const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//password: pasjR8ZjNAwvJxB2

const articlesRoutes = require("./routes/articles");
const categoryRoutes = require("./routes/categories");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongo-url-here",
    {}
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB ERROR => ", err));

app.use("/articles", articlesRoutes);
app.use("/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
