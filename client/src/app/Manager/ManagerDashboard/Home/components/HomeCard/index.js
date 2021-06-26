import React, { Fragment } from "react";
import PropTypes from "prop-types";

const HomeCard = ({
  desc,
  data,
  symbolicIcon,
  sideIcon,
  iconColor,
  textColor,
}) => {
  return (
    <div className="md:w-1/4 sm:w-1/2 w-full">
      <div
        className=" flex justify-between items-center border-2 border-gray-200 p-8 rounded-lg "
        style={{ color: `${iconColor}` }}
      >
        <div className="text-2xl">
          <i className={symbolicIcon}></i>
          <h2
            className="title-font font-medium text-3xl"
            style={{ color: `${textColor}` }}
          >
            {data}
          </h2>
          <p className="leading-relaxed text-lg">{desc}</p>
        </div>
        <div className="text-7xl">
          <i className={sideIcon}></i>
        </div>
      </div>
    </div>
  );
};

HomeCard.propTypes = {
  desc: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  symbolicIcon: PropTypes.string.isRequired,
  side: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default HomeCard;
