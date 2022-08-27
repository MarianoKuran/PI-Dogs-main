import React from "react";
import { useDispatch } from "react-redux";
import { orderAs, orderWeight } from "../../../actions/index.js";
import arrow from "../../../assets/arrow.svg";

import "./Alfhabetic.css";

function Alfhabetic({ pagina, set }) {
  const dispatch = useDispatch();

  function handleOrder(e) {
    pagina(1);
    dispatch(orderAs(e.target.name));
    set(`Ordenado ${e.target.name}`);
  }
  function handleWeight(e) {
    e.preventDefault();
    dispatch(orderWeight(e.target.name));
    pagina(1);
  }

  return (
    <div>
      <ul className="order_links">
        <li className="order_item order_item--show">
          <p className="order_link">
            Order
            <img src={arrow} alt="No do found" className="order_arrow" />
          </p>
          <ul className="order_nesting">
            <li className="order_inside" name="alf">
              <button className="order_link order_link--title">
                Alphabetically
              </button>
            </li>
            <li className="order_inside">
              <button
                className="order_link order_link--inside"
                name="asc"
                onClick={(e) => handleOrder(e)}
              >
                A - Z
              </button>
            </li>
            <li className="order_inside">
              <button
                className="order_link order_link--inside"
                name="desc"
                onClick={(e) => handleOrder(e)}
              >
                Z - A
              </button>
            </li>
            <li className="order_inside" name="weight">
              <button className="order_link order_link--title">Weight</button>
            </li>
            <li className="order_inside">
              <button
                className="order_link order_link--inside"
                name="min"
                onClick={(e) => handleWeight(e)}
              >
                WeightMin
              </button>
            </li>
            <li className="order_inside">
              <button
                className="order_link order_link--inside"
                name="max"
                onClick={(e) => handleWeight(e)}
              >
                WeightMax
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Alfhabetic;
