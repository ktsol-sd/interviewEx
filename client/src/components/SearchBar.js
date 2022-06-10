import "./SearchBar.css";
import React, { useState } from "react";

const SearchBar = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);

  //filter the articles based on the search query
  //we are using toLowerCase function to make the search case insensitive
  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const newFilter = data.filter((value) => {
      return value.categories.some((category) =>
        category.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
    //if the search query is empty, set the filtered data to the original data
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  return (
    <>
      <form className="form-inline-row ">
        <div className="col-8 ">
          <input
            onChange={handleFilter}
            className="form-control"
            type="search"
            placeholder="Search a category..."
          />
        </div>
        {filteredData.length !== 0 && (
          <div className="col-4 dataResult">
            {/* show top 5 results only  */}
            {filteredData.slice(0, 5).map((value, key) => {
              return (
                <a
                  className="dataItem"
                  href={`/articles/${value._id}`}
                  style={{ color: "black" }}
                  key={key}
                >
                  <p className=" dataItem">{value.title}</p>
                </a>
              );
            })}
          </div>
        )}
      </form>
    </>
  );
};
export default SearchBar;
