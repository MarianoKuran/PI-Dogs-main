import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_NAME,
  GET_DETAILS,
  FILTER_CREATED,
  FILTER_TEMPERAMENT,
  ORDER_WEIGHT,
  ORDER_AS,
  ADD_DOG,
} from "../actions";

const initialState = {
  dogs: [],
  temperaments: [],
  filter: [],
  details: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case GET_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case FILTER_TEMPERAMENT:
      /* console.log(state.dogs); */
      const newFilter = state.dogs;
      const statusFilter =
        action.payload === "temeperament"
          ? newFilter
          : newFilter.filter((d) => d.temperament?.includes(action.payload));
      return {
        ...state,
        dogs: statusFilter,
      };
    case FILTER_CREATED:
      const allFilter = state.filter;
      const createFilter =
        action.payload === "created" // esto me llegaria desde la base de datos en caso de que sea creado 
          ? allFilter.filter((dog) => dog.createInDb)
          : allFilter.filter((dog) => !dog.createInDb);
      return {
        ...state,
        dogs: action.payload === "allDogs" ? allFilter : createFilter,
      };
    case ORDER_AS:
      const sortOrder =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortOrder,
      };
    case ORDER_WEIGHT:
      const weight = state.dogs.filter(
        (d) => !isNaN(d.weight ? d.weight[0] : d.weight_min)
      );
      const orderW =
        action.payload === "min"
          ? weight.sort(function (a, b) {
              if (
                parseInt(a.weight ? a.weight[0] : a.weight_min) <
                parseInt(b.weight ? b.weight[0] : b.weight_min)
              ) {
                return -1;
              }
              if (
                parseInt(a.weight ? a.weight[0] : a.weight_min) >
                parseInt(b.weight ? b.weight[0] : b.weight_min)
              ) {
                return 1;
              }
              return 0;
            })
          : weight.sort(function (a, b) {
              if (
                parseInt(a.weight ? a.weight[0] : a.weight_min) <
                parseInt(b.weight ? b.weight[0] : b.weight_min)
              ) {
                return 1;
              }
              if (
                parseInt(a.weight ? a.weight[0] : a.weight_min) >
                parseInt(b.weight ? b.weight[0] : b.weight_min)
              ) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: action.payload === "weight" ? state.filter : orderW,
      };
    case ADD_DOG:
      return {
        ...state,
      };
    default:
      return {
        state,
      };
  }
}
