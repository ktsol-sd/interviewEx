//import model
const Articles = require("../models/articles");

//function to create a article
const createArticle = async (req, res) => {
  const { title, description, content, categories } = req.body;
  //validation of data in order to create an article
  if (!content.length) {
    return res.json({
      error: "Article cannot be empty",
    });
  }
  if (!title.length) {
    return res.json({
      error: "Article needs a title",
    });
  }
  if (categories.length === 0) {
    return res.json({
      error: "Article needs at least one category",
    });
  }
  const exist = await Articles.findOne({ title });
  if (exist) {
    return res.json({
      error: "Article already exists",
    });
  }

  //saving the article in the database
  try {
    const article = new Articles({ title, description, content, categories });
    await article.save();
    res.status(200).json({ msg: "Article created successfully" });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

//creating a feed in home page to show all articles sorted by latest
const articlesFeed = async (req, res) => {
  try {
    const articles = await Articles.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    console.log(err);
  }
};

//function to get an article by ID
const getArticle = async (req, res) => {
  try {
    const article = await Articles.findById(req.params._id);
    res.json(article);
  } catch (err) {
    console.log(err);
  }
};

//function to update an article
const updateArticle = async (req, res) => {
  const { _id } = req.params;
  const content = req.body.content;
  try {
    if (!content) {
      return res.json({ error: "Article cannot be empty" });
    } else {
      const article = await Articles.findByIdAndUpdate(
        _id,
        { content },
        { new: true }
      );
      res.json(article);
    }
  } catch (err) {
    console.log(err);
  }
};

//function to delete an article
const deleteArticle = async (req, res) => {
  try {
    const article = await Articles.findByIdAndDelete(req.params._id);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

//exporting the functions
module.exports = {
  createArticle,
  articlesFeed,
  updateArticle,
  getArticle,
  deleteArticle,
};
