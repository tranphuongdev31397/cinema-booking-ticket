import userApi from "apis/userApi";

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, EDIT_PROFILE } = require("./type")

const actLoginRequest = () =>({
    type: LOGIN_REQUEST
});

const actLoginSuccess = currentUser => ({
    type: LOGIN_SUCCESS,
    payload: currentUser
});

const actLoginFail = error => ({
    type: LOGIN_FAIL,
    payload: error
})

export const actLogin = (user, history) =>{
    return dispatch =>{
        dispatch(actLoginRequest());
        userApi.loginApi(user).then(response =>{
            dispatch(actLoginSuccess(response.data));
            history.push('/');
           
        }).catch(error =>{
            dispatch(actLoginFail('Tên đăng nhập hoặc mật khẩu ko đúng'))
            console.log(error);
        })
    }
}

export const actLogOut = () =>({
    type: LOG_OUT,
    payload: null
})

export const actEditProfile = (userProfileUpdate) => ({
    type: EDIT_PROFILE,
    payload: userProfileUpdate
})