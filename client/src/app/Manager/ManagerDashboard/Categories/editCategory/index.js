import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  updateCategory,
  getCategory,
} from "../../../../../actions/category.actions";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
const EditCategory = ({ category, updateCategory, getCategory }) => {
  let history = useHistory();
  const { categoryId } = useParams();
  const [CategoryData, setCategoryData] = useState({
    categoryId: "",
    categoryName: "",
    description: "",
  });
  useEffect(() => {
    getCategory(categoryId, localStorage.getItem('currentRestaurant'));
  }, []);
  useEffect(() => {
    setCategoryData({
      categoryId: category.category && category.category._id,
      categoryName: category.category && category.category.categoryName,
      description: category.category && category.category.description,
    });
  }, [category.category]);
  const onInputChange = (e) => {
    setCategoryData({ ...CategoryData, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    await updateCategory(
      {
        categoryName: CategoryData.categoryName,
        description: CategoryData.description,
      },
      CategoryData.categoryId,
      localStorage.getItem("currentRestaurant")
    );
    history.push("/manager/dashboard/categories");
  };

  return (
    <section className=" text-gray-600 p-8">
      <div className="border-2 border-gray-200 p-8 rounded-lg">
        <form onSubmit={(e) => onSubmitForm(e)}>
          <div className="mb-4 w-full">
            <label
              htmlFor="categoryName"
              className="leading-7 text-sm text-gray-600"
            >
              Category Name
            </label>
            <input
              onChange={(e) => onInputChange(e)}
              required
              type="text"
              id="categoryName"
              name="categoryName"
              value={CategoryData.categoryName}
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="description"
              className="leading-7 text-sm text-gray-600"
            >
              Description
            </label>
            <textarea
              onChange={(e) => onInputChange(e)}
              required
              type="text"
              id="description"
              name="description"
              value={CategoryData.description}
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg"
          >
            update
          </button>
        </form>
      </div>
    </section>
  );
};

EditCategory.propTypes = {
  updateCategory: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};
//State
const mapStateToProps = (state) => ({
  category: state.category,
});
// Actions
const mapDispatchToProps = {
  updateCategory,
  getCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
