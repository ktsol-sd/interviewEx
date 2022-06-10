//component that allows the user to add/delete categories which takes a category and two functions as props

const CategoryForm = ({
  category,
  setCategory,
  categorySubmit,
  categoryDelete,
}) => {
  return (
    <div className="card">
      <div className="card-body pb-3">
        <form className="form-group">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control"
            placeholder="Type a category"
          />
        </form>
        <div className="card-footer d-flex justify-content-end text-muted">
          <button
            disabled={!category}
            onClick={categorySubmit}
            className="btn btn-primary btn-sm mt-1 px-5 mx-2"
          >
            Add category
          </button>

          <button
            disabled={!category}
            onClick={categoryDelete}
            className="btn btn-danger btn-sm mt-1 px-5 mx-2"
          >
            Delete category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
