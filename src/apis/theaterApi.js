import { GROUP_ID } from "settings/apiConfig";
import { callApi } from "utils/callApi";

export const theaterApi = {
    getTheaterSystem: () =>{
        return callApi('QuanLyRap/LayThongTinHeThongRap');
    },
    getTheaterDetail: (maHeThongRap) =>{
        return callApi(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    },
    addMovieShow: (data, token) =>{
        return callApi('QuanLyDatVe/TaoLichChieu', 'POST', data, token)
    }
}

