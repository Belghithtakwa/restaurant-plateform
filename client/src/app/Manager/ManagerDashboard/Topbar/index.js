import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import {logoutManager} from "../../../../actions/authManager.action"
import avatar from "../../../../assets/images/avatar.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useClickAway } from "react-use";
const ManagerTopbar = ({ logoutManager, auth }) => {
  let history = useHistory();
  const [isDropOpen, setisDropOpen] = useState(false);
  const dropDownRef = useRef(null);
  const avatarRef = useRef(null);
  useClickAway(dropDownRef, (e) => {
    if (e.target !== avatarRef.current) {
      setisDropOpen(false);
    }
  });
  return (
    <div className="flex justify-start items-center h-12">
      <Link to="/" className=" w-16 h-full flex items-center justify-around bg-primary">
        LOGO
      </Link>
      <div className="flex flex-1 justify-between gap-10 items-center px-8">
        <div className="relative flex w-full flex-wrap items-stretch">
          <input
            type="search"
            placeholder="Search"
            className="form-input px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
          />
          <span className="z-10 h-full leading-snug font-normal  text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 -mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
        <div className=" flex gap-6 items-center">
         
          <div className="flex items-center gap-2 relative">
            <div className="text-center my-auto rounded-full h-10 w-10">
              <img
                ref={avatarRef}
                src={avatar}
                alt="avatar "
                className="cursor-pointer"
                onClick={() => setisDropOpen(!isDropOpen)}
              />
              {isDropOpen && (
                <div
                  ref={dropDownRef}
                  className="absolute z-20 min-w-max top-12 right-0 bg-white shadow-md border border-gray-300 rounded-md h-auto">
                  <div className="text-left flex flex-col">
                    {/* <Link
                      to="/manager/dashboard/settings"
                      className="p-2 hover:bg-primary cursor-pointer hover:text-white">
                      Settings
                    </Link>
                    <Link
                      to="/manager/dashboard/profile"
                      className="p-2 hover:bg-primary cursor-pointer hover:text-white">
                      Account
                    </Link> */}
                    <Link
                      to="/manager/dashboard/restaurants"
                      className="p-2 hover:bg-primary cursor-pointer hover:text-white">
                      Restaurants
                    </Link>
                    <div
                      onClick={(e) => {
                        logoutManager();
                        history.push("/");
                      }}
                      className="p-2 hover:bg-primary cursor-pointer hover:text-white">
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ManagerTopbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutManager: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  logoutManager,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerTopbar);
