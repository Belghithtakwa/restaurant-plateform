import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCategories } from "../../../../../actions/category.actions";
import { createOwnedMenu } from "../../../../../actions/menu.actions";
import {useHistory} from 'react-router-dom'
const AddMenu = ({ category, getCategories, createOwnedMenu }) => {
  let history = useHistory()
  useEffect(() => {
    getCategories(localStorage.getItem("currentRestaurant"));
  }, [getCategories, category.loading]);

  const [Categories, setCategories] = useState([]);
  const [MenuData, setMenuData] = useState({
    menuName: "",
    menuSlug: "",
    menuURL: "",
    description: "",
    isActive: null,
    restaurant: "",
  });
  const onInputChange = (e) => {
    setMenuData({ ...MenuData, [e.target.name]: e.target.value });
  };
  const onCategoryRemove = (e, id) => {
    console.log(id);
    const newCategories = Categories.filter(
      (category) => category.categoryID !== id
    );
    setCategories(newCategories);
    console.log(newCategories);
  };
  const onCategorySelect = (e, index) => {
    const id = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    const selectedCategories = [...Categories];

    if (
      selectedCategories
        .map((el) => {
          return el.categoryID;
        })
        .indexOf(id) === -1
    ) {
      selectedCategories[index] = { categoryID: id, categoryName: name };
      setCategories(selectedCategories);
    }
  };
  const addSelectCategoryInput = (e) => {
    const selectedCategories = [...Categories];
    selectedCategories.push({ categoryID: "", categoryName: "" });
    setCategories(selectedCategories);
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log();
    await createOwnedMenu(
      {
        menuName: MenuData.menuName,
        description: MenuData.description,
        categories: [
          ...new Set(
            Categories.map((category) => {
              return category.categoryID;
            })
          ),
        ],
      },
      localStorage.getItem("currentRestaurant")
    );
      history.push('/manager/dashboard/menus')
  };

  return (
    <section className=" text-gray-600 p-8">
      <div className="border-2 border-gray-200 p-8 rounded-lg">
        <form onSubmit={(e) => onSubmitForm(e)}>
          <div className="mb-4 w-full">
            <label
              htmlFor="menuName"
              className="leading-7 text-sm text-gray-600">
              Menu Name
            </label>
            <input
              onChange={(e) => onInputChange(e)}
              required
              type="text"
              id="menuName"
              name="menuName"
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
          <div className="mb-4 w-full">
            <label
              htmlFor="categories"
              className="leading-7 text-sm text-gray-600">
              Categories
            </label>
            <div className="grid grid-cols-5 justify-items-stretch gap-4 mt-2">
              {Categories &&
                Categories.map((selectedElement, index) => {
                  return (
                    <div
                      key={index}
                      className="p-6 text-center shadow-md rounded flex justify-between gap-2 items-center border border-gray-300">
                      <select
                        className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        name="category"
                        onChange={(e) => onCategorySelect(e, index)}>
                        <option value={null}>----</option>
                        {category.categories &&
                          category.categories.map((category) => {
                            return (
                              <option value={category._id}>
                                {category.categoryName}
                              </option>
                            );
                          })}
                      </select>
                      <i
                        onClick={(e) =>
                          onCategoryRemove(e, selectedElement.categoryID)
                        }
                        className="fas fa-minus-square text-xl text-danger cursor-pointer"></i>
                    </div>
                  );
                })}
              <div className="p-6 text-center shadow-md rounded border border-gray-300">
                <i
                  className="fas fas fa-plus-square text-4xl text-center text-success cursor-pointer"
                  onClick={(e) => addSelectCategoryInput(e)}></i>
              </div>
            </div>
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

AddMenu.propTypes = {
  category: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  createOwnedMenu: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.category,
});

const mapDispatchToProps = {
  getCategories,
  createOwnedMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMenu);
