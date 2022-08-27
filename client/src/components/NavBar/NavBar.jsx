import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDogs, getName } from "../../actions/index.js";
import menu from "../../assets/menu.svg";
import HomeGif from "../../assets/HomeGif.gif";
import { HiSearch } from "react-icons/hi";

import './NavBar.css'

function NavBar({ pagina, set }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleClickAllDogs() {
    pagina(1);
    dispatch(getDogs());
  }

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    pagina(1);
    dispatch(getName(name));
    setName("");
  }

  function handleClick(e) {
    let app = document.getElementById("filterId-nav");
    if (app.classList.contains("filters-nav__inside"))
      app.classList.remove("filters-nav__inside");
    else app.classList.add("filters-nav__inside");
  }

  return (
    <nav className="contenedor-SearchBar">
      <div className="searchBar-contenador-nav">
        <div className="searchBar-logo">
          <img
            src={HomeGif}
            alt=""
            className="searchBar_icon"
            onClick={() => handleClickAllDogs()}
          />
          <Link to="/create">
            <button className="searchBar_create">
              <p className="searchBar_text">CREATE DOG</p>
            </button>
          </Link>
          <Link to="/create">
            <button className="searchBar_create searchBar_create-sm">
              <p className="searchBar_text"> CREATE </p>
            </button>
          </Link>
        </div>

        <div className="searchbar-create-icon">
          <div className="searchBar_search">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={name}
                onChange={handleInputChange}
              />
              <div className="searchBar_btn">
                <button className="search_btn-submit">
                  <HiSearch size={23}/>
                </button>
              </div>
            </form>
          </div>
          <img
            src={menu}
            className="searchBar-img"
            id="searchBar-img"
            onClick={handleClick}
            alt="Not do found"
          ></img>
        </div>
      </div>
    </nav>
  );
}

export default NavBar