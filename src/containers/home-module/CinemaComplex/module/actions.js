import  movieApi  from "apis/movieApi";
import {
  FETCH_ALL_CNMCOMPLEX_FAIL,
  FETCH_ALL_CNMCOMPLEX_REQUEST,
  FETCH_ALL_CNMCOMPLEX_SUCCESS,
} from "./types";

//Action fetchAllCnmComplex
const actFetchAllCnmComplexRequest = () => ({
  type: FETCH_ALL_CNMCOMPLEX_REQUEST,
});
const actFetchAllCnmComplexSuccess = (cinemaComplex) => ({
  type: FETCH_ALL_CNMCOMPLEX_SUCCESS,
  payload: cinemaComplex,
});
const actFetchAllCnmComplexFail = (err) => ({
  type: FETCH_ALL_CNMCOMPLEX_FAIL,
  payload: err,
});
export const actFetchAllCnmComplex = () => {
  return async (dispatch) => {
    dispatch(actFetchAllCnmComplexRequest());
    try {
      const { data } = await movieApi.fetchAllCinemaComplexApi();
      dispatch(actFetchAllCnmComplexSuccess(data));
    } catch (err) {
      dispatch(actFetchAllCnmComplexFail(err));
    }
  };
};
