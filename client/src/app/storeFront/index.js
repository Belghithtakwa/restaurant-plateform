import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOwnedMenu } from "../../actions/menu.actions";
import { getProductByCategory } from "../../actions/product.action";
import Spinner from "../utils/Spinner";
import {
  addToClientOrder,
  createClientOrder,
} from "../../actions/order.actions";
import Cart from "./Cart";
const StoreFront = ({
  menu,
  auth,
  getOwnedMenu,
  getProductByCategory,
  product,
  addToClientOrder,
  createClientOrder,
}) => {
  let history = useHistory();
  const { menuId, restaurantId } = useParams();

  useEffect(() => {
    console.log(menuId, restaurantId);
    getOwnedMenu(menuId, restaurantId);
  }, [menuId, restaurantId, menu.loading, getOwnedMenu]);
  useEffect(() => {
    menu.menu &&
      getProductByCategory(menu.menu?.categories[0]._id, restaurantId);
  }, [product.loading, restaurantId, menu.loading]);

  const addToCart = (e, product) => {
    e.preventDefault();
    console.log(restaurantId);
    if (auth.isAuthenticated) {
      if (localStorage.getItem("orderId")) {
        addToClientOrder(
          {
            item: {
              product: product._id,
              quantity: 1,
              price: product.price,
              totalPrice: product.price,
            },
          },
          localStorage.getItem("orderId"),
          restaurantId
        );
      } else {
        createClientOrder(
          {
            items: [
              {
                product: product._id,
                quantity: 1,
                price: product.price,
                totalPrice: product.price,
              },
            ],
          },
          restaurantId
        );
      }
    } else {
      history.push(`/client/login?url=${window.location.href}`);
    }
  };

  if (!auth.loading && !auth.isAuthenticated) {
    history.push(`/client/login`);
  }
  return menu.loading || product.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Cart />
      <div className="container mx-auto">
        <h1 className="text-5xl text-primary-tint capitalize text-center my-6">
          {menu.menu.restaurant.restaurantName}
        </h1>
        <div className="flex justify-start h-full min-h-full w-full">
          <div className="border-r border-t border-l border-gray-300 w-1/4">
            {menu.menu.categories.map((category, index) => {
              return (
                <div
                  onClick={(e) =>
                    getProductByCategory(category._id, restaurantId)
                  }
                  key={category._id}
                  className="text-xl py-4 px-6 bg-primary hover:bg-primary-tint cursor-pointer">
                  {category.categoryName}
                </div>
              );
            })}
          </div>
          <div className="border-r border-t border-gray-300 p-4 w-3/4">
            <div className="grid grid-cols-4 justify-items-stretch gap-4">
              {product.products.map((product, index) => {
                return (
                  <div
                    key={product._id}
                    className="rounded-sm bg-white flex flex-col justify-around items-center shadow-md">
                    <div className="bg-cover">
                      <img className="rounded-sm" src={product.image} alt="" />
                    </div>
                    <div className="mt-4 w-full p-4 max-h-32">
                      <div className="flex justify-between items-baseline">
                        <div className="text-left capitalize text-lg font-bold">
                          {product.productName}
                        </div>
                        <div>{product.price}</div>
                      </div>
                      <div className="truncate">{product.description}</div>
                    </div>
                    <button
                      onClick={(e) => addToCart(e, product)}
                      className="appearance-none focus:outline-none px-6 py-2 bg-primary text-white text-lg hover:bg-primary-tint w-full rounded-b-sm">
                      Buy
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

StoreFront.propTypes = {
  menu: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getProductByCategory: PropTypes.func.isRequired,
  getOwnedMenu: PropTypes.func.isRequired,
  addToClientOrder: PropTypes.func.isRequired,
  createClientOrder: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  menu: state.menu,
  product: state.product,
  auth: state.auth,
});

const mapDispatchToProps = {
  getOwnedMenu,
  getProductByCategory,
  addToClientOrder,
  createClientOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreFront);
