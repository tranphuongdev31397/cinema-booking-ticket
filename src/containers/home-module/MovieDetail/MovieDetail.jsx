import Loader from "components/Loader/Loader";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  actCloseVideo,
  actHandleGetSrcVideo,
} from "../MovieList/module/actions";
import { actFetchMovieDetail } from "./module/actions";
import "./MovieDetail.css";
class MovieDetail extends Component {
  render() {
    if (this.props.loading) return <Loader />;
    return (
      <div className="moviedetail">
        <div className="container moviedetail__container">
          <div className="row moviedetail__top">
            <div className="col col-md-7">
              <div className="moviedetail__left moviedetail__box">
                <div className="moviedetail__img">
                  <img src={this.props.movieDetail.hinhAnh} width="250px"  />
                  <button
                    className="btnPlay"
                    data-toggle="modal"
                    data-target="#modelId"
                    onClick={() =>
                      this.props.handleGetSrcVideo(
                        this.props.movieDetail.trailer
                      )
                    }
                  >
                    <img src="https://tix.vn/app/assets/img/icons/play-video.png" />
                  </button>
                </div>
                <div className="moviedetail__text">
                  <span>
                    {new Date(
                      this.props.movieDetail.ngayKhoiChieu
                    ).toLocaleDateString()}
                  </span>
                  <h2 className="text-white">{this.props.movieDetail.tenPhim}</h2>
               
                </div>
              </div>
            </div>
            <div className="col-5 moviedetail__item">
              <div className="moviedetail__right moviedetail__box">
                <div className="moviedetail__circular">
                  <div className="circular">
                    <div className="inner"></div>
                    <div className="number">
                      {this.props.movieDetail.danhGia}
                    </div>
                    <div className="circle">
                      <div className="bar left">
                        <div className="progress"></div>
                      </div>
                      <div className="bar right">
                        <div className="progress"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="moviedetail__text"></div>
              </div>
            </div>
          </div>
          <div className="moviedetail__bot my-5 mx-2">
            <div className="row moviedetail__info">
              <div className="col col-md-6">
                <div className="moviedetail__row">
                  <p className="moviedetail__title">Ngày công chiếu</p>
                  <p className="moviedetail__content">
                    {new Date(
                      this.props.movieDetail.ngayKhoiChieu
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="moviedetail__row">
                  <p className="moviedetail__title">Đạo diễn</p>
                  <p className="moviedetail__content">{""}</p>
                </div>
                <div className="moviedetail__row">
                  <p className="moviedetail__title">Diễn viên</p>
                  <p className="moviedetail__content">{""}</p>
                </div>
                <div className="moviedetail__row">
                  <p className="moviedetail__title">Thể loại</p>
                  <p className="moviedetail__content">{""}</p>
                </div>
                <div className="moviedetail__row">
                  <p className="moviedetail__title">Định dạng</p>
                  <p className="moviedetail__content">{""}</p>
                </div>
                <div className="moviedetail__row">
                  <p className="moviedetail__title">Quốc gia sản xuất</p>
                  <p className="moviedetail__content">{""}</p>
                </div>
              </div>
              <div className="col col-md-6">
                <div className="row">
                  <div className="col">
                    <p className="moviedetail__title">Nội dung</p>
                    <p className="moviedetail__content">
                      {this.props.movieDetail.moTa}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Body */}
        <div
          className="modal fade"
          id="modelId"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
          onClick={() => this.props.closeVideo()}
        >
          <div className="modal-dialog modal__custom" role="document">
            <div className="modal-content">
              <button
                onClick={() => this.props.closeVideo()}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <div className="modal-body">
                <iframe
                  id="videoSrc"
                  src={`http://www.youtube.com/embed/${this.props.srcVideo}/?autoplay=1`}
                  width="100%"
                  height="500px"
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    return this.props.fetchMovieDetail(this.props.match.params.movieId);
  }
}
const mapStateToProps = (state) => ({
  movieDetail: state.movieDetailReducer.movieDetail,
  loading: state.movieDetailReducer.loading,
  srcVideo: state.movieListReducer.srcVideo,
});
const mapDispatchToProps = (dispatch) => ({
  fetchMovieDetail: (movieId) => {
    dispatch(actFetchMovieDetail(movieId));
  },
  closeVideo: () => {
    dispatch(actCloseVideo());
  },
  handleGetSrcVideo: (srcVideo) => {
    dispatch(actHandleGetSrcVideo(srcVideo));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
