import { GROUP_ID } from "settings/apiConfig";
import { callApi } from "utils/callApi";


const userApi = {
    loginApi(user){
        return callApi('QuanLyNguoiDung/DangNhap', 'POST', user)
    }
,
    getUserListApi(){
        // return callApi(`QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${GROUP_ID}&soTrang=${currentPage}&soPhanTuTrenTrang=${NUMBER_EACH_PAGE}`, 'GET', null);
        return callApi(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`, 'GET');
    },

    updateUserApi(userInfo, token){
        
        return callApi(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`, 'PUT', userInfo, token);
    },

    deleteUser(username, token){
        return callApi(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${username}`, 'DELETE',null, token);
    },
    newUser(user, token){
        return callApi(`QuanLyNguoiDung/ThemNguoiDung`, 'POST', user, token);
    },
    searchUser(searchValue, token){
        let linkApi = `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}`
        if(searchValue){
            linkApi += `&tuKhoa=${searchValue}`
        }
        return callApi(linkApi, 'GET', null, token);
    },
    registerApi(user){
        return callApi('QuanLyNguoiDung/DangKy', 'POST', user)
    },
    // getUserListApi(currentPage){
    //     return callApi(`QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${GROUP_ID}&soTrang=${currentPage}&soPhanTuTrenTrang=${NUMBER_EACH_PAGE}`, 'GET', null);
    // },
    fetchUserProfileApi(taiKhoan){
        return callApi('QuanLyNguoiDung/ThongTinTaiKhoan','POST', taiKhoan)
    },
    editProfileApi(userUpdate,userToken) {
        return callApi('QuanLyNguoiDung/CapNhatThongTinNguoiDung','PUT', userUpdate, userToken)
    }

    
}


export default userApi;
