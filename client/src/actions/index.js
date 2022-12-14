import axios from "axios";

// types
export const GET_DOGS = "GET_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DETAILS = "GET_DETAILS";
export const GET_NAME = "GET_NAME";
export const ADD_DOG = "ADD_DOG";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_WEIGHT = "ORDER_WEIGHT";
export const ORDER_AS = "ORDER_AS";
const {
  REACT_APP_API_URL 
} = process.env;

export function getDogs() {
  return async function (dispatch) {
    let dogs = await axios.get(`${REACT_APP_API_URL}/dogs`);
    dispatch({
      type: GET_DOGS,
      payload: dogs.data,
    });
  };
}
export function getTemperaments() {
  return async function (dispatch) {
    let temperaments = await axios.get(`${REACT_APP_API_URL}/temperament`);
    dispatch({
      type: GET_TEMPERAMENTS,
      payload: temperaments.data,
    });
  };
}

export function filterTemperament(temperament) {
  return {
    type: FILTER_TEMPERAMENT,
    payload: temperament,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function createDog(payload) {
  return async function (dispatch) {
    var response = await axios.post(`${REACT_APP_API_URL}/dogs`, payload);
    return response;
  };
}

export function orderAs(payload) {
  return {
    type: ORDER_AS,
    payload,
  };
}

export function orderWeight(payload) {
  return {
    type: ORDER_WEIGHT,
    payload,
  };
}

export function getName(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${REACT_APP_API_URL}/dogs?name=` + name);
      return dispatch({
        type: GET_NAME,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    const json = await axios.get(`${REACT_APP_API_URL}/dogs/` + id);
    dispatch({
      type: GET_DETAILS,
      payload: json.data,
    });
  };
}