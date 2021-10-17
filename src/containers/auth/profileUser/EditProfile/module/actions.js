import { FECTH_USER_PROFILE } from "./types";

export const actFetchUserProfile = (userProfile) => ({
    type: FECTH_USER_PROFILE,
    payload: userProfile
})