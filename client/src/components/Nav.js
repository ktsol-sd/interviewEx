import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="nav d-flex justify-content-between gradient">
      <div className="my-2 mx-2">
        <Link className="link" to="/">
          <button type="button" className="btn secondBtnColor text-white">
            Home
          </button>
        </Link>
        <Link className="link" to="/articles/createArticle">
          <button type="button" className="btn secondBtnColor text-white">
            Create new article
          </button>
        </Link>
        <Link className="link" to="/categories">
          <button type="button" className="btn secondBtnColor text-white">
            {" "}
            Categories{" "}
          </button>
        </Link>
      </div>
    </nav>
  );
};
export default Nav;
