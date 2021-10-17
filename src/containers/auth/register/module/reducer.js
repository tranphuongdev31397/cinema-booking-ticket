import { TIX_REGISTER } from "./types"

const initialState = {

}

const tixRegisterReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case TIX_REGISTER:
        return { ...state }

    default:
        return state
    }
}
export default tixRegisterReducer
