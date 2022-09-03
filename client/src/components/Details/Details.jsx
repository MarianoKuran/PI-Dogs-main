import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../actions/index.js";
import { Link } from "react-router-dom";

import { GiWeight } from "react-icons/gi";
import { AiOutlineHeart } from "react-icons/ai";
import { IoMdGlobe } from "react-icons/io";
import { MdOutlineAddReaction } from "react-icons/md";
import { VscSymbolRuler } from "react-icons/vsc";
import home from "../../assets/casa-de-perro.gif";

import "./Details.css";

function Details(props) {
  const dispatch = useDispatch();
  const dogDetails = useSelector((state) => state.details);
  console.log(dogDetails);
  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  }, [props.match.params.id, dispatch]);

  return (
    <>
      <nav className="detail_nav">
        <Link to="/home" className="details_links--home">
          <img src={home} alt="icon" className="details-nav_icon" />
          <p> Back To Home </p>
        </Link>
      </nav>
      {dogDetails === undefined || dogDetails.length === 0 ? (
        <>
          <p className="details_error"> Oops... page not found </p>
        </>
      ) : (
        <>
          <div className="section_ctn">
            <section className="details_ctn">
              <img
                className="details_img"
                src={dogDetails.image ? dogDetails.image : dogDetails[0].image}
                alt="Not do found"
              />
              <div className="details_texts">
                <h2 className="details_name">
                  🐾​ {dogDetails.name ? dogDetails.name : dogDetails[0].name}
                  🐾​
                </h2>
                <div className="detail_ctn">
                <p className="detail_title">
                    <IoMdGlobe size={25} className="details_icon" /> Origin
                    <IoMdGlobe size={25} className="details_icon" />
                  </p>
                  <p className="detail_info">
                    {dogDetails.origin
                      ? dogDetails.origin
                      : dogDetails[0].origin}
                  </p>
                </div>
                <div className="detail_ctn">
                  <p className="detail_title">
                    <VscSymbolRuler size={25} className="details_icon" /> Height
                    <VscSymbolRuler size={25} className="details_icon" />
                  </p>
                  <p className="detail_info">
                    {dogDetails.height
                      ? `${dogDetails.height[0]} - ${dogDetails.height[1]} Mtrs`
                      : `${dogDetails[0].height_min} - ${dogDetails[0].height_max} Mtrs`}
                  </p>
                </div>
                <div className="detail_ctn">
                  <p className="detail_title">
                    <GiWeight size={25} className="details_icon" /> Weight
                    <GiWeight size={25} className="details_icon" />
                  </p>
                  <p className="detail_info">
                    {dogDetails.weight
                      ? `${dogDetails.weight[0]} - ${dogDetails.weight[1]} Kg`
                      : `${dogDetails[0].weight_min} - ${dogDetails[0].weight_max} Kg`}
                  </p>
                </div>
                <div className="detail_ctn">
                  <p className="detail_title">
                    <AiOutlineHeart size={25} className="details_icon" /> Life
                    Span <AiOutlineHeart size={25} className="details_icon" />
                  </p>
                  <p className="detail_info">
                    {dogDetails.life_span
                      ? dogDetails.life_span
                      : `${dogDetails[0].age} years`}
                  </p>
                </div>
                <div className="detail_ctn">
                  <p className="detail_title">
                    <MdOutlineAddReaction size={25} className="details_icon" />
                    Temperament
                    <MdOutlineAddReaction size={25} className="details_icon" />
                  </p>
                  <p className="detail_info">
                    {dogDetails.temperament
                      ? dogDetails.temperament
                      : dogDetails[0].temperaments.map((t) => {
                          return (
                            <span key={t.id} className="detail_info">
                              {t.name}
                            </span>
                          );
                        })}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </>
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
