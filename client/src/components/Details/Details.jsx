import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../actions/index.js";
import { Link } from "react-router-dom";

import { GiWeight } from "react-icons/gi";
import { AiOutlineHeart, AiFillHome } from "react-icons/ai";
import { MdOutlineAddReaction } from "react-icons/md";
import { VscSymbolRuler } from "react-icons/vsc";

import "./Details.css";

function Details(props) {
  const dispatch = useDispatch();
  const dogDetails = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  }, [props.match.params.id, dispatch]);

  return (
    <>
      {dogDetails ? (
        <>
          <nav className="detail_nav">
            <Link to="/home" className="details_links--home">
              <AiFillHome size={30} />
              <p> Back To Home </p>
            </Link>
          </nav>
          <div className="section_ctn">
            <section className='details_ctn'>
              <img className='details_img' src={dogDetails.image ? dogDetails.image : dogDetails[0].image} alt="Not do found" />
              <div className='details_texts'>
                <h2 className='details_name'>🐾​ {dogDetails.name ? dogDetails.name : dogDetails[0].name} 🐾​</h2>
                <span className='details'> Height <VscSymbolRuler size={25} className='details_icon'/></span>
                <span className='details'> Weight <GiWeight size={25} className='details_icon'/></span>
                <span className='details'> Life Span <AiOutlineHeart size={25} className='details_icon'/></span>
                <span className='details'> Temperament  <MdOutlineAddReaction size={25} className='details_icon'/></span>
              </div>
            </section>
          </div>
        </>
      ) : (
        <div>
          <h3 className="loading">Wait a Second...</h3>
        </div>
      )}
    </>
  );
}

/*  

<nav className="detail_nav">
            <Link to="/home" className="details_links--home">
              <AiFillHome size={30} />
              <p> Back To Home </p>
            </Link>
          </nav>

<div className="details_ctn">
          
          <img className='details_img' src={dogDetails.image ? dogDetails.image : dogDetails[0].image} alt="Not do found" />

          <section className='details_grid'>
            <div className='details_grid__texts'>
              <h2 className='details_grid__title'> Welcome to</h2>
              <h2 className='details_grid__title details_title--transform'> WikiDogs 🐾​</h2>
            </div>
          </section>
        </div>*/
export default Details;
