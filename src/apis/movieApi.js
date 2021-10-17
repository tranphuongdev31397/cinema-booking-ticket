import { GROUP_ID } from "settings/apiConfig";
import { callApi } from "utils/callApi";

// movie api here
 const movieApi = {
  fetchMovieByPageApi: (currentPage, countInPage) => {
    //currentPage: Số trang cần callApi
    //countInPage: Số phần tử (phim) trong 1 trang
    return callApi(
      `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${GROUP_ID}&soTrang=${currentPage}&soPhanTuTrenTrang=${countInPage}`
    );
  },
  fetchAllCinemaComplexApi: () => {
    return callApi(
      `QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`
    );
  },
  fetchAllMovieApi: () => {
    return callApi(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
  },
  fetchShowTimeByMovieApi: (movieId) => {
    return callApi(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`);
  },
  fetchMovieDetailApi: (movieId) => {
    return callApi(`QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
  },
  fetchSeatPlanApi: (showTimeId) => {
    return callApi(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimeId}`)
  },
  addMovieApi: (formData) =>{
    return callApi(`QuanLyPhim/ThemPhimUploadHinh`,'POST',formData);
  },
  updateMovieInfo: (formData, token) =>{
    return callApi(`QuanLyPhim/CapNhatPhimUpload`, 'POST', formData, token);
  },
  deleteMovieInfo: (maPhim, token) =>{
    return callApi(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,'DELETE',null, token);
  }
    ,
  buyTicketApi: (seatPlanInfo, userToken) => {
    return callApi(`QuanLyDatVe/DatVe`, "POST", seatPlanInfo, userToken);
  },
};
export default movieApi;
