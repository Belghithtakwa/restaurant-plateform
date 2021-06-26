import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Fragment>
      <aside className="flex flex-col items-center bg-white text-gray-700 shadow w-16">
       

        <ul>
          <li className="hover:text-primary">
            <Link
              to="/client/dashboard/home"
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
        </ul>
      </aside>
    </Fragment>
  );
};

export default Sidebar;
