import {
  CLOSE_VIDEO,
  FETCH_ALL_MOVIE_FAIL,
  FETCH_ALL_MOVIE_REQUEST,
  FETCH_ALL_MOVIE_SUCCESS,
  HANDLE_GET_SRC_VIDEO,
} from "./types";

const initialState = {
  movieList: [],
  loading: true,
  srcVideo: "",
  err: "",
};

const movieListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_MOVIE_SUCCESS:
      const data = payload;
      return {
        ...state,
        movieList: data,
      
        loading: false,
      };
    case FETCH_ALL_MOVIE_FAIL:
      return { ...state, err: payload, loading: false };
    case HANDLE_GET_SRC_VIDEO:
      return { ...state, srcVideo: payload };
    case CLOSE_VIDEO:
      return { ...state, srcVideo: "" };
    default:
      return state;
  }
};
export default movieListReducer;
