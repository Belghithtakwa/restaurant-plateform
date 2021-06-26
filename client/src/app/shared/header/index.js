import React, { Fragment, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { APP_TITLE } from "../../../constants/app";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutManager } from "../../../actions/authManager.actions";
import { logoutClient } from "../../../actions/authClient.actions";
import { useHistory } from "react-router-dom";

const Navbar = ({ auth, order, logoutManager, logoutClient }) => {
  const notShowInUrls = [
    "/manager/dashboard",
    "/client/dashboard",
    "/menu",
    "/order",
    "/payment",
  ];
  const [codeData, setcodeData] = useState("");
  const onInputChange = (e) => {
    setcodeData(e.target.value);
  };
  const match = useRouteMatch(notShowInUrls);
  let history = useHistory();
  const scrollToContactUs = async (e) => {
    e.preventDefault();
    await history.push("/");
    const element = document.getElementById("contact-us");
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const onCodeSubmit = async (e) => {
    e.preventDefault();
    history.push(`/orders/details/${codeData}`);
  };
  const publicLinks = (
    <Fragment>
      <Link
        to="/"
        className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 mr-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-10 h-10 text-white p-2 bg-primary rounded-full"
          viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-xl">{APP_TITLE}</span>
      </Link>
      <form
        onSubmit={(e) => onCodeSubmit(e)}
        className="flex items-center justify-between gap-6">
        <input
          onChange={(e) => onInputChange(e)}
          required
          type="text"
          id="orderCode"
          name="orderCode"
          className="bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Order Code"
        />
        <button
          type="submit"
          className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg">
          Search
        </button>
      </form>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <Link to="/" className=" font-semibold hover:text-primary mr-5">
          Home
        </Link>
        <Link to="/about" className=" font-semibold hover:text-primary mr-5">
          About
        </Link>
        <Link to="/Pricing" className=" font-semibold hover:text-primary mr-5">
          Pricing
        </Link>
       
         <button
          onClick={(e) => {
            scrollToContactUs(e);
          }}
          className=" appearance-none focus:outline-none outline-none font-semibold hover:text-primary mr-5">
          Contact Us
        </button>
      </nav>

      <Link
        to="/manager/login"
        className=" font-semibold hover:text-primary flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 gap-2">
        <div>Login</div>
        <div className="text-primary text-xl">
          <i className="fas fa-sign-in-alt"></i>
        </div>
      </Link>
    </Fragment>
  );
  const clientLinks = (
    <Fragment>
      <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 mr-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-10 h-10 text-white p-2 bg-primary rounded-full"
          viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-xl">{APP_TITLE}</span>
      </Link>
      <form
        onSubmit={(e) => onCodeSubmit(e)}
        className="flex items-center justify-between gap-6">
        <input
          onChange={(e) => onInputChange(e)}
          required
          type="text"
          id="orderCode"
          name="orderCode"
          className="bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Order Code"
        />
        <button
          type="submit"
          className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg">
          Search
        </button>
      </form>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <Link to="/" className=" font-semibold hover:text-primary mr-5">
          Home
        </Link>
        <Link to="/about" className=" font-semibold hover:text-primary mr-5">
          About
        </Link>
        <Link to="/pricing" className=" font-semibold hover:text-primary mr-5">
          Pricing
        </Link>
        <button
          onClick={(e) => {
            scrollToContactUs(e);
          }}
          className=" appearance-none focus:outline-none outline-none font-semibold hover:text-primary mr-5">
          Contact Us
        </button>
      </nav>
      <Link
        to="/client/dashboard/home"
        className=" font-semibold hover:text-primary flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 gap-2">
        <div>Dashboard</div>
        <div className="text-primary text-xl">
          <i className="fas fa-home"></i>
        </div>
      </Link>
      <button
        onClick={(e) => {
          logoutClient();
        }}
        className=" font-semibold hover:text-primary flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 gap-2">
        <div>Logout</div>
        <div className="text-primary text-xl">
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </button>
    </Fragment>
  );
  const managerLinks = (
    <Fragment>
      <Link to ="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 mr-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-10 h-10 text-white p-2 bg-primary rounded-full"
          viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-xl">{APP_TITLE}</span>
      </Link>
      <form
        onSubmit={(e) => onCodeSubmit(e)}
        className="flex items-center justify-between gap-6">
        <input
          onChange={(e) => onInputChange(e)}
          required
          type="text"
          id="orderCode"
          name="orderCode"
          className="bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          placeholder="Order Code"
        />
        <button
          type="submit"
          className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg">
          Search
        </button>
      </form>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <Link to="/" className=" font-semibold hover:text-primary mr-5">
          Home
        </Link>
        <Link to="/about" className=" font-semibold hover:text-primary mr-5">
          About
        </Link>
        <Link to="/pricing" className=" font-semibold hover:text-primary mr-5">
          Pricing
        </Link>
        <button
          onClick={(e) => {
            scrollToContactUs(e);
          }}
          className=" appearance-none focus:outline-none outline-none font-semibold hover:text-primary mr-5">
          Contact Us
        </button>
      </nav>
      <Link
        to="/manager/dashboard/home"
        className=" font-semibold hover:text-primary flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 gap-2">
        <div>Dashboard</div>
        <div className="text-primary text-xl">
          <i className="fas fa-home"></i>
        </div>
      </Link>
      <button
        onClick={(e) => {
          logoutManager();
        }}
        className=" font-semibold hover:text-primary flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 gap-2">
        <div>Logout</div>
        <div className="text-primary text-xl">
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </button>
    </Fragment>
  );

  const setNavLinks = () => {
    if (auth.isAuthenticated) {
      if (auth.user.isManager) {
        return managerLinks;
      } else {
        return clientLinks;
      }
    } else {
      return publicLinks;
    }
  };
  return (
    !match && (
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 items-center">
          {setNavLinks()}
        </div>
      </header>
    )
  );
};
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  logoutManager: PropTypes.func.isRequired,
  logoutClient: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
});
const mapDispatchToProps = {
  logoutManager,
  logoutClient
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
