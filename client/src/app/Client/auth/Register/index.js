import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { registerClient } from "../../../../actions/authClient.actions";
import Spinner from "../../../utils/Spinner";
import { useQuery } from "../../../../hooks";
const ClientRegister = ({ registerClient, auth }) => {
  let query = useQuery()
  let history = useHistory();
  const [registerForm, setRegisterForm] = useState({
    streetName: "",
    codeZip: "",
    blockNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const onInputChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    await registerClient(registerForm);
    history.push(`/client/login?url=${query.get("url")}`);
  };
  return auth.loading ? (
    <Spinner />
  ) : (
    <div className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto flex">
        <div className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Register as Client
          </h2>
          <form onSubmit={(e) => onSubmitForm(e)}>
            <div className="relative mb-4 flex w-full gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="leading-7 text-sm text-gray-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="leading-7 text-sm text-gray-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="relative mb-4 flex w-full gap-4">
              <div className="w-1/3">
                <label
                  htmlFor="streetName"
                  className="leading-7 text-sm text-gray-600"
                >
                  Street Name
                </label>
                <input
                  type="text"
                  id="streetName"
                  name="streetName"
                  className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="w-1/3">
                <label
                  htmlFor="blockNumber"
                  className="leading-7 text-sm text-gray-600"
                >
                  Block Number
                </label>
                <input
                  type="number"
                  id="blockNumber"
                  name="blockNumber"
                  className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="w-1/3">
                <label
                  htmlFor="codeZip"
                  className="leading-7 text-sm text-gray-600"
                >
                  Zip Code
                </label>
                <input
                  type="number"
                  id="codeZip"
                  name="codeZip"
                  className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="phoneNumber"
                className="leading-7 text-sm text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary-tint text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button
              type="submit"
              className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-shade rounded text-lg"
            >
              Register
            </button>
          </form>

          <Link
            to={`/client/login?url=${query.get("url")}`}
            className="text-xs text-gray-500 mt-3 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

ClientRegister.propTypes = {
  registerClient: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  registerClient,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientRegister);
