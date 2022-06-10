import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CreateArticle from "./Pages/Articles/createArticle";
import Article from "./Pages/Articles/Article";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/Nav";
import EditArticle from "./Pages/Articles/edit/EditArticle";
import EditCategories from "./Pages/Categories/EditCategories";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:_id" element={<Article />} />
          <Route path="/articles/:_id/update" element={<EditArticle />} />
          <Route path="/articles/createArticle" element={<CreateArticle />} />
          <Route path="/categories" element={<EditCategories />} />
        </Routes>
        <ToastContainer position="top-center" />
      </div>
    </BrowserRouter>
  );
}

export default App;
