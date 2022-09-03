import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../actions/index.js";

import home from '../../assets/casa-de-perro.gif'
import "./CreateDog.css";

function validate(form) {
  let error = {};

  if (!form.name) {
    error.name = "You can't create the breed without giving it a name.";
  } else if (form.name.length > 30) {
    error.name = "Too long. Choose a simpler name.";
  } else if (!isNaN(parseInt(form.name))) {
    error.name = "Name must not be a number.";
  } else if (!isNaN(parseInt(form.origin))) {
    error.origin = "Origin must not be a number.";
  } else if (!form.height_min) {
    error.height_min = "Minimum height is required.";
  } else if (isNaN(parseInt(form.height_min))) {
    error.height_min = "Height should be a number.";
  } else if (form.height_min <= 0) {
    error.height_min = "Your breed can't be shorter than 0.";
  } else if (parseInt(form.height_min) >= parseInt(form.height_max)) {
    error.height_max = "Maximum height should be lower than minimum height.";
  } else if (!form.height_max) {
    error.height_max = "Maximum height is required.";
  } else if (isNaN(parseInt(form.height_max))) {
    error.height_max = "Height should be a number.";
  } else if (form.height_max > 150) {
    error.height_max = "I think 150cm is enough for a dog's height, don't you?";
  } else if (!form.weight_min) {
    error.weight_min = "Minimum weight is required.";
  } else if (isNaN(parseInt(form.weight_min))) {
    error.weight_min = "Weight should be a number.";
  } else if (form.weight_min <= 0) {
    error.weight_min = "Your breed must weight at least more than 0.";
  } else if (!form.weight_max) {
    error.weight_max = "Maximum weight is required.";
  } else if (isNaN(parseInt(form.weight_max))) {
    error.weight_max = "Weight should be a number.";
  } else if (parseInt(form.weight_max) <= parseInt(form.weight_min)) {
    error.weight_max = "Maximum weight should be higher than minimum weight.";
  } else if (form.weight_max > 200) {
    error.weight_max = "Weight must be less than 200.";
  } else if (!form.age) {
    error.age = "Life span is required.";
  } else if (isNaN(parseInt(form.age))) {
    error.age = "Life span should be a number.";
  } else if (form.age > 50) {
    error.age = "Saddly, :( dogs don't live that long.";
  } else if (form.age <= 0) {
    error.age = "You don't want your dog to live?";
  }
  return error;
}

function CreateDog() {
  const dispatch = useDispatch();
  const history = useHistory(); //redireccion
  const allTemperaments = useSelector((state) => state.temperaments); //temperamentos para el input select
  const [error, setError] = useState({}); //errores que iran apareciendo segun las condiciones de validacion del form
  const [form, setForm] = useState({
    name: "",
    age: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    image: "",
    origin: "",
    temperament: [],
  }); //estados de los inputs de form 

  useEffect(() => {
    dispatch(getTemperaments()); 
  }, [dispatch]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectTemp(e) {
    setForm({
      ...form,
      temperament: form.temperament.includes(e.target.value)
        ? form.temperament
        : [...form.temperament, e.target.value], // agrego los temperamentos que los usuarios van seleccionando a un array
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !Object.getOwnPropertyNames(error).length &&
      form.name &&
      form.height_min &&
      form.height_max &&
      form.weight_min &&
      form.weight_max &&
      form.age
    ) {
      dispatch(createDog(form));
      alert("Dog created successfully👏");
      setForm({
        name: "",
        age: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        image: "",
        origin: "",
        temperament: [],
      });
      history.push("/home");
    } else {
      alert("Dog can´t be created with these data 🤷‍♂️");
    }
  }

  function deleteTemperament(e) {
    console.log(e);
    setForm({
      ...form,
      temperament: form.temperament.filter((d) => d !== e),
    });
  }

  return (
    <>
      <nav className="detail_nav">
        <Link to="/home" className="details_links--home">
          <img src={home} alt="icon" className="details-nav_icon" />
          <p> Back To Home </p>
        </Link>
      </nav>
      <div className="create_contenedor">
        <h1 className="create_title">🐾 Create a Dog 🐾</h1>
        <form className="create_form" onSubmit={(e) => handleSubmit(e)}>
          <div className="create_items">
            <label className="create_label">🐾 Name 🐾</label>
            <input
              type="text"
              value={form.name}
              placeholder="Name"
              name="name"
              onChange={handleChange}
              className="create_input"
            />
            {error.name && (
              <p className="create_error">
                <strong>{error.name}</strong>
              </p>
            )}
          </div>
          <div className="create_items">
            <label className="create_label">🐾 Origin 🐾</label>
            <input
              type="textarea"
              value={form.origin}
              placeholder=" Origin"
              name="origin"
              onChange={handleChange}
              className="create_input"
            />
            {error.origin && (
              <p className="create_error">
                <strong>{error.origin}</strong>
              </p>
            )}
          </div>
          <div className="create_items">
            <label className="create_label">🐾 Height min 🐾</label>
            <input
              type="text"
              value={form.height_min}
              placeholder="Height min"
              name="height_min"
              onChange={handleChange}
              className="create_input"
            />
            {error.height_min && (
              <p className="create_error"> {error.height_min} </p>
            )}
          </div>
          <div className="create_items">
            <label className="create_label">🐾 Height max 🐾</label>
            <input
              type="text"
              value={form.height_max}
              placeholder="Height max"
              name="height_max"
              onChange={handleChange}
              className="create_input"
            />
            {error.height_max && (
              <p className="create_error"> {error.height_max} </p>
            )}
          </div>
          <div className="create_items">
            <label className="create_label">🐾 Weight min 🐾</label>
            <input
              type="text"
              value={form.weight_min}
              placeholder="Weight min"
              name="weight_min"
              onChange={handleChange}
              className="create_input"
            />
            {error.weight_min && (
              <p className="create_error"> {error.weight_min} </p>
            )}
          </div>
          <div className="create_items">
            <label className="create_label">🐾 Weight max 🐾</label>
            <input
              type="text"
              value={form.weight_max}
              placeholder="Weight max"
              name="weight_max"
              onChange={handleChange}
              className="create_input"
            />
            {error.weight_max && (
              <p className="create_error"> {error.weight_max} </p>
            )}
          </div>
          <div className="create_items">
            <label className="create_label">🐾 Life span 🐾</label>
            <input
              type="text"
              value={form.age}
              placeholder="Life span"
              name="age"
              onChange={handleChange}
              className="create_input"
            />
            {error.age && (
              <p className="create_error"> {error.age} </p>
            )}
          </div>
          <div className="create_items">
            <label className="create_label">🐾 Image 🐾</label>
            <input
              type="text"
              placeholder="URL"
              value={form.image}
              name="image"
              onChange={handleChange}
              className="create_input"
            />
          </div>
          <div className="create_items">
            <label className="create_label">🐾 Temperaments 🐾</label>
            <select
              onChange={(e) => handleSelectTemp(e)}
              className="create_select"
            >
              <option value="temp" className="create_options">
                Select Temperaments{" "}
              </option>
              {allTemperaments &&
                allTemperaments?.map((d) => (
                  <option key={d.id} value={d.name} className="create_options">
                    {d.name}
                  </option>
                ))}
            </select>
            <div className="create_temperament">
              {form.temperament.map((e, i) => (
                <p key={i}>
                  {e}
                  <span
                    className="create_delete"
                    onClick={() => deleteTemperament(e)}
                  >
                    x
                  </span>
                </p>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="create_link"
          >
            CREATE
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateDog