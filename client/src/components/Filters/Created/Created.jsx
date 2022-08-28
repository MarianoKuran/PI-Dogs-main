import React from "react";
import { useDispatch } from "react-redux";
import { filterCreated, getDogs } from "../../../actions/index.js";
import arrow from "../../../assets/arrow.svg";

import "./Created.css";

function Created() {
  const dispatch = useDispatch();

  function handleFilter(e) {
    dispatch(filterCreated(e.target.name));
  }
  function handleClick() {
    dispatch(getDogs());
  }

  return (
    <div>
      <ul className="filter_links">
        <li className="filter_item filter_item--show">
          <p className="filter_link">
            Filter
            <img src={arrow} alt="No do found" className="filter_arrow" />
          </p>
          <ul className="filter_nesting">
            <li className="filter_inside">
              <button
                className="filter_link filter_link--inside"
                name="allDogs"
                onClick={() => handleClick()}
              >
                All the Doggies
              </button>
            </li>
            <li className="filter_inside">
              <button
                className="filter_link filter_link--inside"
                name="created"
                onClick={(e) => handleFilter(e)}
              >
                Created
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Created;
