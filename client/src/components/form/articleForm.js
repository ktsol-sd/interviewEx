import { useState, useEffect } from "react";
import CategoryList from "../cards/CategoriesList";
import axios from "axios";

const ArticleForm = ({
  articleTitle,
  setArticleTitle,
  content,
  setContent,
  articleSubmit,
  selectedCategories,
  setSelectedCategories,
  description,
  setDescription,
  page,
}) => {
  const [showCategory, setShowCategory] = useState("");

  //function that adds all the selected categories into an array
  const handleChange = (e, selectedCategory) => {
    const { checked } = e.target;
    if (checked)
      setSelectedCategories((selectedCategories) => [
        ...selectedCategories,
        selectedCategory,
      ]);
    else
      setSelectedCategories((selectedCategories) =>
        selectedCategories.filter(
          (category) => category._id !== selectedCategory._id
        )
      );
  };

  //fetching all the categories from the database
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/categories/showCategories"
      );
      setShowCategory(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="card">
      <div className="card-body pb-3">
        <form className="form-group">
          {/* inputs that allow the user to add a title, description, content, etc. The disabled option is there for when we call the component from the "update article" page */}
          <input
            type="text"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            className="form-control"
            placeholder="Article Title"
            disabled={page === "update"}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            placeholder="Write an article description"
            disabled={page === "update"}
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            placeholder="Write your article here..."
            style={{ height: "300px" }}
          ></textarea>
          <div className="form-group p-2">
            <small>
              <label className="text-muted">Select a category</label>
            </small>

            <CategoryList
              categories={showCategory}
              onChange={handleChange}
              className="form-control"
              page={page}
            />
          </div>
        </form>
      </div>

      <div className="card-footer d-flex justify-content-end text-muted">
        <button
          disabled={!content}
          onClick={articleSubmit}
          className="btn btn-primary btn-sm mt-1 px-5 mx-2"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default ArticleForm;
