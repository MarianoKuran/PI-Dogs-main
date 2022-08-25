import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../../actions";

import Card from "../Card/Card.jsx";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";

import DogIcon from "../../assets/DogIcon.jpg";
import "./Home.css";


function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  //para paginado
  const dogsPerPage = 8; // revision set
  const length = allDogs?.length;
  const [currentPage, setCurrentPage] = useState(1); // setea al ejecutarse la f() paginado
  const indexLastDog = currentPage * dogsPerPage; // obtiene el ultimo perro que debe renderizar la pagina actual
  const indexFirstDog = indexLastDog - dogsPerPage; // obtiene el primer perro que debe renderizar la pagina actual 
  const currentDogs = allDogs?.slice(indexFirstDog, indexLastDog); //del arr con todos los perros, corta solo los que deberia mostrar en la pagina indicada.
  
  const [, setOrden] = useState("");
  const [, setError] = useState(false);


  //funcion que me devuelve el numero actual de la pagina en que estoy
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments())
      .catch((error) => setError(error.message));
  }, [dispatch]); // para que no se genere un loop infinito
  
  return (
    <>
      <>
        <NavBar pagina={setCurrentPage} set={setOrden}/>
      </>
      <Paginado 
        dogsPerPage={dogsPerPage}
        allDogs={length}
        currentPage={currentPage}
        paginado={paginado}
      />
      <div className="card-home">
        {currentDogs?.map((d) => {
          return (
            <Card
              key={d.id}
              id={d.id}
              name={d.name}
              image={d.image ? d.image : DogIcon}
              temperament={
                d.temperament ? (
                  d.temperament
                ) : d.temperaments ? (
                  d.temperaments.map((t) => t.name + " ")
                ) : (
                  <></>
                )
              }
              weight={d.weight ? d.weight[0] : d.weight_min}
            />
          ); // le paso siempre el peso minimo
        })}
      </div>
      <Paginado 
        dogsPerPage={dogsPerPage}
        allDogs={length}
        currentPage={currentPage}
        paginado={paginado}
      />
    </>
  )
}

export default Home