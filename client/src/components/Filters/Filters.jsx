import React from "react";
import Order from "./Order/Order";
import ByTemperament from "./ByTemperament/ByTemperament";

import './Filters.css'
import Created from "./Created/Created";

function Filters({ pagina, set }) {
  return (
      <div className="container_filters">
        <div className="filters">
          <Order pagina={pagina} set={set} />
        </div>
        <div className="filters">
          <ByTemperament pagina={pagina}/>
        </div>
        <div className="filters">
          <Created pagina={pagina}/>
        </div>
      </div>
  );
}

export default Filters;
