import  movieApi  from "apis/movieApi";
import {
  FETCH_ALL_MOVIE_FAIL,
  FETCH_ALL_MOVIE_REQUEST,
  FETCH_ALL_MOVIE_SUCCESS,
  FETCH_SHOWTIME_BY_MOVIE_FAIL,
  FETCH_SHOWTIME_BY_MOVIE_REQUEST,
  FETCH_SHOWTIME_BY_MOVIE_SUCCESS,
  GET_CINEMA_COMPLEX_DATA,
} from "./types";

//FetchAllMovie
const actFetchAllMovieRequest = () => ({
  type: FETCH_ALL_MOVIE_REQUEST,
});
const actFetchAllMovieSuccess = (movieList) => ({
  type: FETCH_ALL_MOVIE_SUCCESS,
  payload: movieList,
});
const actFetchAllMovieFail = (err) => ({
  type: FETCH_ALL_MOVIE_FAIL,
  payload: err,
});
export const actFetchAllMovie = () => {
  return async (dispatch) => {
      dispatch(actFetchAllMovieRequest())
      try {
        const {data} = await movieApi.fetchAllMovieApi()
        dispatch(actFetchAllMovieSuccess(data))
      }
      catch (err) {
        dispatch(actFetchAllMovieFail(err))
      }
  };
};
//FetchShowTimeByMovie
const actFetchShowTimeByMovieRequest = () => ({
  type: FETCH_SHOWTIME_BY_MOVIE_REQUEST,
});
const actFetchShowTimeByMovieSuccess = (data) => ({
  type: FETCH_SHOWTIME_BY_MOVIE_SUCCESS,
  payload: data,
});
const actFetchShowTimeByMovieFail = (err) => ({
  type: FETCH_SHOWTIME_BY_MOVIE_FAIL,
  payload: err,
});
export const actFetchShowTimeByMovie = (movieId) => {
  return async (dispatch) => {
      dispatch(actFetchShowTimeByMovieRequest())
      try {
        const {data} = await movieApi.fetchShowTimeByMovieApi(movieId)
        dispatch(actFetchShowTimeByMovieSuccess(data))
      }
      catch (err) {
        dispatch(actFetchShowTimeByMovieFail(err))
      }
  };
};
////Lấy data cụm rạp chiếu phim  khi click chọn rạp
export const actCinemaComplexData = (data) => ({
  type: GET_CINEMA_COMPLEX_DATA,
  payload: data
})
