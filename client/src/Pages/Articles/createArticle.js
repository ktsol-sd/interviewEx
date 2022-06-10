import axios from "axios";
import { useState } from "react";
import ArticleForm from "../../components/form/articleForm";
import { toast } from "react-toastify";

const CreateArticle = () => {
  //article states
  const [articleTitle, setArticleTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  //article submit function to send to the server
  const articleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = {
        title: articleTitle,
        description: description,
        content: content,
        categories: selectedCategories,
      };
      const res = await axios.post(
        "http://localhost:5000/articles/createArticles",
        data
      );
      if (res.data.error) {
        toast.error(res.data.error);
      } else if (res.status === 200) {
        toast.success(res.data.msg);
        setContent("");
        setArticleTitle("");
        setDescription("");
        setSelectedCategories([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row py-5 text-black">
        <div className="col text-center">
          <h1>Create Article</h1>
        </div>
      </div>
      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          {/* passing the article states to the form as props */}
          <ArticleForm
            content={content}
            setContent={setContent}
            articleTitle={articleTitle}
            setArticleTitle={setArticleTitle}
            description={description}
            setDescription={setDescription}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            articleSubmit={articleSubmit}
            page="create"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
