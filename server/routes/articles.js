const router = require("express").Router();

//importing functions from the controller
const {
  createArticle,
  articlesFeed,
  getArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles");

//routing the article functions to the correct path
router.get("/feed", articlesFeed);
router.post("/createArticles", createArticle);
router.get("/:_id", getArticle);
router.post("/:_id/update", updateArticle);
router.delete("/:_id/delete", deleteArticle);

module.exports = router;
