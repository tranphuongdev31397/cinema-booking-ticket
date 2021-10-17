
import movieApi from "apis/movieApi";
import {
  CLOSE_VIDEO,
  FETCH_ALL_MOVIE_FAIL,
  FETCH_ALL_MOVIE_REQUEST,
  FETCH_ALL_MOVIE_SUCCESS,
  HANDLE_GET_SRC_VIDEO,
} from "./types";

const actFetchAllMovieSuccess = (movieList) => ({
  type: FETCH_ALL_MOVIE_SUCCESS,
  payload: movieList,
});
const actFetchAllMovieRequest = () => ({
  type: FETCH_ALL_MOVIE_REQUEST,
});
const actFetchAllMovieFail = (err) => ({
  type: FETCH_ALL_MOVIE_FAIL,
  payload: err,
});
export const actFetchAllMovie = () => {
  return async (dispatch) => {
    dispatch(actFetchAllMovieRequest());
    try {
      const { data } = await movieApi.fetchAllMovieApi();
      dispatch(actFetchAllMovieSuccess(data));
    } catch (err) {
      dispatch(actFetchAllMovieFail(err));
    }
  };
};
export const actHandleGetSrcVideo = (srcVideo) => ({
  type: HANDLE_GET_SRC_VIDEO,
  payload: srcVideo,
});
export const actCloseVideo = () => ({
  type: CLOSE_VIDEO,
});
