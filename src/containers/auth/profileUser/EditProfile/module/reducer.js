const { FECTH_USER_PROFILE } = require("./types")

const initialState = {
 userProfile : []
}

const userProfileReducer = (state = initialState, { type, payload }) => {
    switch (type) {

    case FECTH_USER_PROFILE:
        return { ...state, userProfile: payload }

    default:
        return state
    }
}
export default userProfileReducer
