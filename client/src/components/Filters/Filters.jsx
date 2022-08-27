import React from "react";
import Alfhabetic from "./Alfhabetic/Alfhabetic";

import './Filters.css'

function Filters({ pagina, set }) {
  return (
      <div className="container_filters">
        <div className="filters">
          <Alfhabetic pagina={pagina} set={set} />
        </div>
        <div className="filters"></div>
        <div className="filters"></div>
      </div>
  );
}

export default Filters;
