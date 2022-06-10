const router = require("express").Router();

//importing functions from the controller
const {
  createCategory,
  showCategories,
  deleteCategory,
} = require("../controllers/categories");

//routing the category functions to the correct path
router.post("/createCategory", createCategory);
router.get("/showCategories", showCategories);
router.delete("/deleteCategory", deleteCategory);

module.exports = router;
