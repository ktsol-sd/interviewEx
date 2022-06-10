const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Articles = mongoose.model("Articles", articleSchema);
module.exports = Articles;
