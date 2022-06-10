//import model
const Categories = require("../models/categories");

//function to create a category
const createCategory = async (req, res) => {
  const category = req.body;
  //validation of data in order to create a category
  if (!category) {
    return res.json({
      error: "Category field cannot be empty",
    });
  }
  const exist = await Categories.findOne(category);
  if (exist) {
    return res.json({
      error: "Category already exists!",
    });
  }
  try {
    const newCategory = new Categories(category);
    await newCategory.save();
    res.status(200).json({ msg: "Category created successfully" });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

const showCategories = async (req, res) => {
  try {
    const categories = await Categories.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    console.log(err);
  }
};

//function to delete a category
const deleteCategory = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.json({
      error: "Category field cannot be empty",
    });
  }
  try {
    const exists = await Categories.findOne(data);
    //checking if the input is an ID or not and deleting the category based on if the input is ID or not.
    if (data.category.match(/^[0-9a-fA-F]{24}$/)) {
      await Categories.findByIdAndDelete(data.category);
      res.status(200).json({ msg: "Category deleted successfully" });
    } else if (exists) {
      await Categories.deleteOne(data);
      res.status(200).json({ msg: "Category deleted successfully" });
    } else {
      return res.json({
        error: "Category does not exist!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//exporting the functions
module.exports = {
  createCategory,
  showCategories,
  deleteCategory,
};
