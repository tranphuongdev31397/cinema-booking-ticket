import  movieApi  from "apis/movieApi";

const {
  FETCH_MOVIE_DETAIL_REQUEST,
  FETCH_MOVIE_DETAIL_SUCCESS,
  FETCH_MOVIE_DETAIL_FAIL,
} = require("./types");

const actFetchMovieDetailRequest = () => ({
  type: FETCH_MOVIE_DETAIL_REQUEST,
});
const actFetchMovieDetailSuccess = (movieDetail) => ({
  type: FETCH_MOVIE_DETAIL_SUCCESS,
  payload: movieDetail,
});
const actFetchMovieDetailFail = (err) => ({
  type: FETCH_MOVIE_DETAIL_FAIL,
  payload: err,
});
export const actFetchMovieDetail = (movieId) => {
  return async (dispatch) => {
    dispatch(actFetchMovieDetailRequest());
    try {
      const { data } = await movieApi.fetchMovieDetailApi(movieId);
      dispatch(actFetchMovieDetailSuccess(data));
    } catch (err) {
      dispatch(actFetchMovieDetailFail(err));
    }
  };
};
