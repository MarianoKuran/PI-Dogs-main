import React from "react";
import { CgArrowLeftO, CgArrowRightO } from "react-icons/cg";
import '../Paginado/Paginado.css'

//alldogs: cantidad de perros en el estado = alldogs.length
//dogsPerPage: cantidad de perros por pagina = 8 perros aunque al ser un estado puede variar el numero
//paginado: funcion que recibe el numero de pagina
//currentPage: pagina actual determinada por la f()paginado 

function Paginado({ dogsPerPage, allDogs, paginado, currentPage }) {
  const pageNumber = [];
  var totalPages = Math.ceil(allDogs / dogsPerPage); //ceil es porque el total me devuelve 21,5 

  for (let i = 0; i <= totalPages; i++) {
    pageNumber.push(i);
  }

  function handleBack() {
    currentPage === 1 ? paginado(currentPage) : paginado(currentPage - 1);
  }

  function handleNext() {
    currentPage === pageNumber.length - 1 //el length me da una pagina de mas por ende le resto uno asi no se pasa de pagina al llegar al final
      ? paginado(currentPage)
      : paginado(currentPage + 1);
  }

  return (
    <div className="pages_ctn">
      <div className="icon_ctn">
        <CgArrowLeftO
          onClick={(e) => handleBack(e)}
          className="icon"
          size={50}
        />
      </div>

      <div className="pages_info">
        <span className="pages_num">{currentPage}</span>
        <p className="of"> of </p>
        <span className="pages_num">{totalPages}</span>
      </div>

      <div className="icon_ctn">
        <CgArrowRightO
          onClick={(e) => handleNext(e)}
          className="icon"
          size={50}
        />
      </div>
    </div>
  );
}

export default Paginado;
