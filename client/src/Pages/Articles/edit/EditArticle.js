import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import ArticleForm from "../../../components/form/articleForm";
import { useNavigate } from "react-router-dom";

const EditArticle = () => {
  const [article, setArticle] = useState({});
  const [articleTitle, setArticleTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  let navigate = useNavigate();
  const { _id } = useParams();

  //fetching the article from the server
  useEffect(() => {
    if (_id) fetchArticle();
  }, [_id]);

  const fetchArticle = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/articles/${_id}`);
      setArticle(data);
      setArticleTitle(data.title);
      setDescription(data.description);
      setCategory(data.category);
      setContent(data.content);
    } catch (err) {
      console.log(err);
    }
  };

  //send request to update the article on the server
  const articleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        title: articleTitle,
        description: description,
        category: category,
        content: content,
      };
      const res = await axios.post(
        `http://localhost:5000/articles/${_id}/update`,
        data
      );
      setArticle(data);
      toast.success("Article Updated");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 text-black">
        <div className="col text-center">
          <h1 className="text-black">Update Article</h1>
        </div>
      </div>
      <div className="row py-3">
        <div className="col-md-8 offset-md-2">
          {/* passing the states as prop to the form */}
          <ArticleForm
            articleTitle={articleTitle}
            setArticleTitle={setArticleTitle}
            description={description}
            setDescription={setDescription}
            content={content}
            setContent={setContent}
            category={category}
            setCategory={setCategory}
            articleSubmit={articleSubmit}
            page="update"
          />
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
