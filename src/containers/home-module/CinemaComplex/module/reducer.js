import { FETCH_ALL_CNMCOMPLEX_FAIL, FETCH_ALL_CNMCOMPLEX_REQUEST, FETCH_ALL_CNMCOMPLEX_SUCCESS } from "./types"

const initialState = {
    loading: true,
    err: '',
    cinemaComplex: []
}
 const cinemaComplexReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case FETCH_ALL_CNMCOMPLEX_REQUEST:
        return { ...state, loading:true}
    case FETCH_ALL_CNMCOMPLEX_SUCCESS:
        return { ...state,cinemaComplex:payload, loading: false}
    case FETCH_ALL_CNMCOMPLEX_FAIL:
        return { ...state,err: payload, loading: false}

    default:
        return state
    }
}

export default cinemaComplexReducer
