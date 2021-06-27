import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Fragment>
      <aside className="flex flex-col items-center bg-white text-gray-700 shadow w-16">
        {/* <div className="h-16 flex items-center w-full">
          <a className="h-6 w-6 mx-auto" href="http://svelte.dev/">
            <img
              className="h-6 w-6 mx-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
              alt="svelte logo"
            />
          </a>
        </div> */}

        <ul>
          <li className="hover:text-primary">
            <Link
              to="/manager/dashboard/home"
              className="h-16 px-6 flex justify-center items-center w-full
					">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <g>
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  <path d="M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6" />
                </g>
              </svg>
            </Link>
          </li>

          <li className="hover:text-primary">
            <Link
              to="/manager/dashboard/menus"
              className="h-16 px-6 flex justify-center items-center w-full
					">
              <i className="fas fa-bars"></i>
            </Link>
          </li>

          <li className="hover:text-primary">
            <Link
              to="/manager/dashboard/categories"
              className="h-16 px-6 flex justify-center items-center w-full
					">
              <i className="fas fa-th-list"></i>
            </Link>
          </li>

          <li className="hover:text-primary">
            <Link
              to="/manager/dashboard/products"
              className="h-16 px-6 flex justify-center items-center w-full
					">
              <i className="fas fa-box"></i>
            </Link>
          </li>

          <li className="hover:text-primary">
            <Link
              to="/manager/dashboard/orders"
              className="h-16 px-6 flex justify-center items-center w-full
					">
              <i className="fas fa-receipt"></i>
            </Link>
          </li>
        </ul>
      </aside>
    </Fragment>
  );
};


export default Sidebar;
