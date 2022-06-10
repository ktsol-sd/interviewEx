import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/form/categoryForm";
import CategoryList from "../../components/cards/CategoriesList";

const CreateCategory = () => {
  //category states
  const [category, setCategory] = useState("");

  const [showCategory, setShowCategory] = useState("");

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

  const categorySubmit = async (e) => {
    e.preventDefault();

    try {
      let data = {
        category: category,
      };
      const res = await axios.post(
        "http://localhost:5000/categories/createCategory",
        data
      );
      if (res.data.error) {
        toast.error(res.data.error);
      } else if (res.status === 200) {
        toast.success(res.data.msg);
        setCategory("");
        getCategories();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const categoryDelete = async (e) => {
    e.preventDefault();
    try {
      let data = {
        category: category,
      };
      const answer = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (!answer) return;

      const res = await axios.delete(
        "http://localhost:5000/categories/deleteCategory",
        { data }
      );
      if (res.data.error) {
        toast.error(res.data.error);
      } else if (res.status === 200) {
        toast.success(res.data.msg);
        setCategory("");
        getCategories();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 text-black">
        <div className="col text-center">
          <h1>Edit categories</h1>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-md-8">
          <CategoryList categories={showCategory} page="edit" />
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-4 offset-md-4">
          {/* <button className="btn btn-danger mb-2">Delete categories</button> */}
          <CategoryForm
            category={category}
            setCategory={setCategory}
            categorySubmit={categorySubmit}
            categoryDelete={categoryDelete}
          />
        </div>
      </div>
    </div>
  );
};
export default CreateCategory;
