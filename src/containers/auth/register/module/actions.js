import { TIX_REGISTER } from "./types";

export const actRegister = (user) => ({
    type: TIX_REGISTER,
    payload:user,
})