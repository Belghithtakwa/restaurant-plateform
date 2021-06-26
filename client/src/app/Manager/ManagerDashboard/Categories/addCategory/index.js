import React, { useState } from "react";
import PropTypes from "prop-types";
import { createCategory } from "../../../../../actions/category.actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
const AddCategory = ({ createCategory }) => {
  let history = useHistory();
  const [CategoryData, setCategoryData] = useState({
    categoryName: "",
    categorySlug: "",
    description: "",
    restaurant: "",
  });
  const onInputChange = (e) => {
    setCategoryData({ ...CategoryData, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    await createCategory(
      {
        categoryName: CategoryData.categoryName,
        description: CategoryData.description,
      },
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
              className="leading-7 text-sm text-gray-600">
              Category Name
            </label>
            <input
              onChange={(e) => onInputChange(e)}
              required
              type="text"
              id="categoryName"
              name="categoryName"
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="description"
              className="leading-7 text-sm text-gray-600">
              Description
            </label>
            <textarea
              onChange={(e) => onInputChange(e)}
              required
              type="text"
              id="description"
              name="description"
              className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg">
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

AddCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  createCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
