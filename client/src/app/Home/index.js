import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 class="sm:text-3xl text-2xl font-medium text-gray-400">
              We don't just serve food
            </h1>
            <p class="mb-8 mt-4 ml-8 sm:text-6xl text-4xl font-semibold text-gray-900">
              We Serve Happiness<span className="text-indigo-500">.</span>
            </p>
            <div class="flex justify-center">
              <Link
                to="/pricing"
                class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Try for free
              </Link>
            </div>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              class="object-cover object-center rounded"
              alt="hero"
              src="https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMHdhaXRlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            />
          </div>
        </div>
      </section>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium  mb-4 text-gray-900">
              Master Cleanse Reliac Heirloom
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them man bun deep jianbing selfies heirloom prism
              food truck ugh squid celiac humblebrag.
            </p>
          </div>
          <div class="flex flex-wrap -m-4 text-center">
            <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <div className="text-indigo-500 text-5xl">
                  <i class="fas fa-user-alt"></i>
                </div>
                <p class=" font-medium text-gray-900">
                  Pick plan and create your account.
                </p>
                <p class="leading-relaxed">Thousand of users</p>
              </div>
            </div>
            <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <div className="text-indigo-500 text-5xl">
                  <i class="fas fa-utensils"></i>
                </div>
                <p class=" font-medium text-gray-900">Customize your menu</p>
                <p class="leading-relaxed">Thousand of pre made templates</p>
              </div>
            </div>
            <div class="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <div className="text-indigo-500 text-5xl">
                  <i class="fas fa-rocket"></i>
                </div>
                <p class=" font-medium text-gray-900">
                  Rocket your online presence
                </p>
                <p class="leading-relaxed">In minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
