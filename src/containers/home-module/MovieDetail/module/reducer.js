const {
  FETCH_MOVIE_DETAIL_REQUEST,
  FETCH_MOVIE_DETAIL_SUCCESS,
  FETCH_MOVIE_DETAIL_FAIL,
} = require("./types");

const initialState = {
  movieDetail: [],
  loading: true,
  err: "",
};

const movieDetailReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MOVIE_DETAIL_REQUEST:
      return { ...state, loading: true };
    case FETCH_MOVIE_DETAIL_SUCCESS:
      return { ...state, movieDetail: payload, loading: false };
    case FETCH_MOVIE_DETAIL_FAIL:
      return { ...state, err: payload, loading: false };

    default:
      return state;
  }
};
export default movieDetailReducer;
