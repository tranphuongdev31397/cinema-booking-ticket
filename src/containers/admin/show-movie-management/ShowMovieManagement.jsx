import { Pagination } from "antd";
import movieApi from "apis/movieApi";
import SideBar from "components/SideBar/SideBar";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Redirect } from "react-router";
import { DefaultSelectedIndex, LoaiNguoiDung } from "settings/appConfig";
import { openNotification } from "utils/notification";
import ShowMovieModal from "./show-movie-modal/ShowMovieModal";
import "./ShowMovieManagement.css";

class ShowMovieManagement extends Component {
  state = {
    isLoading: false,
    movieList: null,
    currentPage: 1,
    totalCount: 1,
    openModal: false,
    movieInfo: null,
  };
  getMovieListPagination = () => {
    this.setState({ isLoading: true });
    movieApi
      .fetchMovieByPageApi(this.state.currentPage, 8)
      .then((result) => {
        this.setState({
          movieList: result.data.items,
          isLoading: false,
          totalCount: result.data.totalCount,
        });
      })
      .catch((error) => {
        openNotification("error", "Dữ liệu hiện đang lỗi");
        this.setState({ isLoading: false });
        console.log(error);
      });
  };
  componentDidMount() {
    this.getMovieListPagination();
  }

  onChangePage = async (page) => {
    await this.setState({ currentPage: page });
    this.getMovieListPagination();
  };

  addShowMovie = (maPhim, hinhAnh, tenPhim) => {
    this.setState({
      movieInfo: { maPhim: maPhim, hinhAnh: hinhAnh, tenPhim: tenPhim },
      openModal: true,
    });
  };

  callBackData = (childData) => {
    this.setState({ openModal: false });
  };
  render() {
    return this.props.currentUser && this.props.currentUser.maLoaiNguoiDung == LoaiNguoiDung.QUAN_TRI ? (
      <div className="row">
        <div className="col-2" style={{ paddingLeft: 0 }}>
          <SideBar defaultIndex={DefaultSelectedIndex.ShowMovieManagement} />
        </div>
        <div
          className="col-10"
          style={{ paddingLeft: "50px", paddingTop: "50px" }}
        >
          <div className="row">
            {this.state.movieList &&
              this.state.movieList.map((movie) => {
                return (
                  <div className="col-3 card pt-3">
                    <img
                      className="card-img-top film-image"
                      src={movie.hinhAnh}
                      alt={movie.biDanh}
                    />
                    <div className="card-body">
                      <h4 className="card-title">{movie.tenPhim}</h4>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          this.addShowMovie(
                            movie.maPhim,
                            movie.hinhAnh,
                            movie.tenPhim
                          )
                        }
                      >
                        Thêm lịch chiếu
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <Pagination
            total={this.state.totalCount}
            className="mt-4 d-flex justify-content-center"
            onChange={this.onChangePage}
          />
          {this.state.openModal && (
            <ShowMovieModal
              visible={true}
              movieInfo={this.state.movieInfo}
              getData={this.callBackData}
            />
          )}
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});
export default connect(mapStateToProps, null)(ShowMovieManagement);
