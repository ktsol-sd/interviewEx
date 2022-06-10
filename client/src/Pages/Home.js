import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ArticleList from "../components/cards/ArticleList";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [articles, setArticles] = React.useState([]);

  // fetching articles from the server
  const getArticles = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/articles/feed");
      setArticles(data);
    } catch (err) {
      console.log(err);
    }
  };

  //in case anything updates, fetch the articles again
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row py-5 text-black">
        <div className="col text-center">
          <h1 className="text-black">Home</h1>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-md-8">
          <ArticleList articles={articles} />
        </div>

        <div className="col-md-4">
          <SearchBar data={articles} />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Home;
