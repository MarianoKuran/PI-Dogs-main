import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card({ name, image, temperament, weight, id }) {
  return (
    <div className="card_ctn">
      <Link to={`/${id}`} className='a_card'>
        <div className="card_ctn-img">
          <img
            src={image}
            alt={`Image of a ${name}`}
            className="card_img"
            width="200px"
            height="250px"
          />
        </div>
        <div className="card_content">
          <h3 className="card_name">{`🐾​  ${name}  🐾`}</h3>
          <div className="card_data">
            <span className="spn-card"> Temperament </span>
            <p>{temperament}</p>
          </div>
          <div className="card_data"> 
            <span className="spn-card">Weight </span> 
            <p>{weight} kg</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
