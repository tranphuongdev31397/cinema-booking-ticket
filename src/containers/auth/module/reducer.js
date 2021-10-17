import { EDIT_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "./type";

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

const authReducer =  (state = initialState, { type, payload }) => {
    switch (type) {

    case LOGIN_REQUEST:
        return { ...state, loading: true, error: null}
    case LOGIN_SUCCESS:
        return { ...state, loading: false, currentUser: payload}
    case LOGIN_FAIL:
        return { ...state, loading: false, error: payload}
    case LOG_OUT:
        return {...state, currentUser: payload}
    case EDIT_PROFILE:
        return {...state, currentUser: payload}

    default:
        return state;
    }
}

export default authReducer;
