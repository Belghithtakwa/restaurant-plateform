import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { loginClient } from "../../../../actions/authClient.actions";
import { connect } from "react-redux";
import Spinner from "../../../utils/spinner"
const ClientLogin = ({ loginClient, auth: { isAuthenticated, loading } }) => {
  let history = useHistory();
  const [loginForm, setLoginForm] = useState({
    loginInfo: "",
    password: "",
  });
  const onInputChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    loginClient(loginForm);
  };
  if (isAuthenticated) {
    history.push("/client/dashboard/home");
  }
  return loading ? (
    <Spinner />
  ) : (
    <div className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto flex">
        <div className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Login as Client
          </h2>
          <form onSubmit={(e) => onSubmitForm(e)}>
            <div className="relative mb-4">
              <label
                htmlFor="loginInfo"
                className="leading-7 text-sm text-gray-600">
                Email/PhoneNumber
              </label>
              <input
                onChange={(e) => onInputChange(e)}
                required
                type="text"
                id="loginInfo"
                name="loginInfo"
                className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                onChange={(e) => onInputChange(e)}
                required
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg">
              Login
            </button>
            <Link
              to="/client/register"
              className="text-xs text-gray-500 mt-3 hover:underline">
              Create account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

ClientLogin.propTypes = {
  loginClient: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  loginClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientLogin);
