import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCategories,
  deleteCategory,
} from "../../../../actions/category.actions";
import Spinner from "../../../utils/Spinner";
const DashboardCategories = ({
  getCategories,
  deleteCategory,
  category,
  restaurant,
}) => {
  useEffect(() => {
    getCategories(localStorage.getItem("currentRestaurant"));
  }, [category.loading]);

  return category.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="text-gray-600 p-8">
        <div>
          <Link
            to="/manager/dashboard/categories/create"
            className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg">
            Add category
          </Link>
        </div>
        <div className="border rounded-md shadow mt-10">
          <table className="text-left w-full ">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-gray-200">
                  Name
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-gray-200">
                  Description
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {category.categories &&
                category.categories.map((category) => {
                  return (
                    <tr className="hover:bg-grey-lighter">
                      <td className="py-4 px-6 border-b border-gray-200">
                        {category.categoryName}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200">
                        {category.description}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200">
                        <Link
                          to={`/manager/dashboard/categories/${category._id}/edit`}
                          className="w-10 h-10 focus:outline-none appearance-none font-bold py-1 px-3 rounded text-xs hover:bg-primary hover:text-white">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            deleteCategory(
                              category._id,
                              localStorage.getItem("currentRestaurant")
                            );
                          }}
                          className="w-10 h-10 focus:outline-none appearance-none font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-primary hover:text-white">
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </Fragment>
  );
};
DashboardCategories.propTypes = {
  category: PropTypes.object.isRequired,
  restaurant: PropTypes.object,
  getCategories: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.category,
  restaurant: state.restaurant,
});

const mapDispatchToProps = {
  getCategories,
  deleteCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCategories);
