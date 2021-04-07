import React from "react";
import { Link } from "react-router-dom";
import { APP_TITLE } from "../../../constants/app";
const Navbar = (props) => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">{APP_TITLE}</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className=" font-semibold hover:text-indigo-500 mr-5">Home</Link>
          <Link to="/about" className=" font-semibold hover:text-indigo-500 mr-5">About</Link>
          <Link to="/Pricing" className=" font-semibold hover:text-indigo-500 mr-5">Pricing</Link>
          <Link  className=" font-semibold hover:text-indigo-500 mr-5">Contact Us</Link>
        </nav>
        <Link to="/manager/login" className=" font-semibold hover:text-indigo-500 flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 gap-2">
          <div>Login</div>
          <div className="text-indigo-500 text-xl">
            <i className="fas fa-sign-in-alt"></i>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
