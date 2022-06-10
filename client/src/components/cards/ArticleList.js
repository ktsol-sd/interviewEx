import Article from "./Articles";

const ArticleList = ({ articles, page }) => {
  //component that maps through the articles and renders each article
  return (
    <>
      {articles &&
        articles.map((article, _id) => <Article key={_id} article={article} />)}
    </>
  );
};

export default ArticleList;
