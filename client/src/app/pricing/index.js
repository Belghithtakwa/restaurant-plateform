import React, {Fragment} from 'react'
import {Link} from "react-router-dom"
const Pricing = () => {
  return (
    <Fragment>
      <div className="bg-white dark:bg-gray-800">
        <div className="container px-6 py-8 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-8 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
            <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex-shrink-0">
                <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-primary uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                  Casual
                </h2>
              </div>
              <div className="flex-shrink-0">
                <span className="pt-2 text-4xl font-bold text-gray-800 uppercase dark:text-gray-100">
                  Free
                </span>
              </div>
              <ul className="flex-1 space-y-4">
                <li className="text-gray-500 dark:text-gray-400">
                  Up to 5 projects
                </li>
                <li className="text-gray-500 dark:text-gray-400">
                  Up to 10 collaborators
                </li>
                <li className="text-gray-500 dark:text-gray-400">2Gb of storage</li>
              </ul>
              <Link
                to="/manager/register"
                className="inline-flex items-center justify-center px-4 py-2 font-semibold text-white uppercase transition-colors  rounded-lg focus:outline-none bg-primary hover:bg-primary-tint">
                free trail
              </Link>
              {/* <button
                    class="inline-flex items-center justify-center px-4 py-2 font-semibold text-white uppercase transition-colors bg-primary hover:bg-primary-tint"
                >
                    Start free
                </button> */}
            </div>

            <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex-shrink-0">
                <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight text-primary uppercase rounded-lg bg-gray-50 dark:bg-gray-700">
                  Profesional
                </h2>
              </div>
              <div className="flex-shrink-0">
                <span className="pt-2 text-4xl font-bold text-gray-800 uppercase dark:text-gray-100">
                  $24.90
                </span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="flex-1 space-y-4">
                <li className="text-gray-500 dark:text-gray-400">
                  Up to 10 projects
                </li>
                <li className="text-gray-500 dark:text-gray-400">
                  Up to 20 collaborators
                </li>
                <li className="text-gray-500 dark:text-gray-400">
                  10Gb of storage
                </li>
                <li className="text-gray-500 dark:text-gray-400">
                  Real-time collaborations
                </li>
              </ul>
              <Link
                to="/manager/register"
                className="inline-flex items-center justify-center px-4 py-2 font-semibold text-white uppercase transition-colors  rounded-lg focus:outline-none bg-primary hover:bg-primary-tint">
                start free trial
              </Link>
              {/* <button
                    class="inline-flex items-center justify-center px-4 py-2 font-semibold text-white uppercase transition-colors rounded-lg  hover:bg-primary-tint bg-primary"
                >
                    Start free trial
                </button> */}
            </div>

            <div className="flex flex-col w-full max-w-sm p-8 space-y-8 text-center bg-white border-2 border-gray-200 rounded-lg lg:mx-4 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex-shrink-0">
                <h2 className="inline-flex items-center justify-center px-2 font-semibold tracking-tight uppercase rounded-lg bg-gray-50 dark:bg-gray-700 text-primary">
                  Expert
                </h2>
              </div>
              <div className="flex-shrink-0">
                <span className="pt-2 text-4xl font-bold text-gray-800 uppercase dark:text-gray-100">
                  $49.90
                </span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul className="flex-1 space-y-4">
                <li className="text-gray-500 dark:text-gray-400">
                  Unlimited projects
                </li>
                <li className="text-gray-500 dark:text-gray-400">
                  Unlimited collaborators
                </li>
                <li className="text-gray-500 dark:text-gray-400">
                  Unlimited storage
                </li>
                <li className="text-gray-500 dark:text-gray-400">
                  Real-time collaborations
                </li>
                <li className="text-gray-500 dark:text-gray-400">
                  24x7 Support
                </li>
              </ul>
              <Link
                to="/manager/register"
                className="inline-flex items-center justify-center px-4 py-2 font-semibold text-white uppercase transition-colors  rounded-lg focus:outline-none bg-primary hover:bg-primary-tint">
                start free trial
              </Link>
              {/* <button
                    className="inline-flex items-center justify-center px-4 py-2 font-semibold text-white uppercase transition-colors  rounded-lg focus:outline-none bg-primary hover:bg-primary-tint"
                >
                    Start free trial
                </button> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Pricing;
