import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProducts, deleteProduct } from "../../../../actions/product.action";
import Spinner from "../../../utils/Spinner";
const DashboardProducts = ({
  getProducts,
  deleteProduct,
  product,
  restaurant,
}) => {
  useEffect(() => {
    getProducts(localStorage.getItem("currentRestaurant"));
  }, [getProducts, product.loading]);

  return product.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="text-gray-600 p-8">
        <div>
          <Link
            to="/manager/dashboard/products/create"
            className="inline-flex text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg"
          >
            Add product
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
                  Category
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
              {product.products &&
                product.products.map((product) => {
                  return (
                    <tr key={product._id} className="hover:bg-grey-lighter">
                      <td className="py-4 px-6 border-b border-gray-200">
                        {product.productName}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200">
                        {product.category.categoryName}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200">
                        {product.description}
                      </td>
                      <td className="py-4 px-6 border-b border-gray-200">
                        <Link
                          to={`/manager/dashboard/products/${product._id}/edit`}
                          className="w-10 h-10 focus:outline-none appearance-none font-bold py-1 px-3 rounded text-xs hover:bg-primary hover:text-white"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            deleteProduct(
                              product._id,
                              localStorage.getItem("currentRestaurant")
                            );
                          }}
                          className="w-10 h-10 focus:outline-none appearance-none font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-primary hover:text-white"
                        >
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
DashboardProducts.propTypes = {
  product: PropTypes.object.isRequired,
  restaurant: PropTypes.object,
  getProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.product,
  restaurant: state.restaurant,
});

const mapDispatchToProps = {
  getProducts,
  deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProducts);
