import Loader from "components/Loader/Loader";
import React, { Component } from "react";
import './CinemaComplex.css'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import { actFetchAllCnmComplex } from "./module/actions";

class CinemaComplex extends Component {
  render() {
    if (this.props.loading) return <Loader />;
    return (
      <div className="container cinecomplex_container" id="cinemacomplex">
        <div className="row cinecomplex__board">
          <div className="col-4 col-md-2">
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              {this.props.cinemaComplex.map((cnmComplex,idx) => {
                return (
                  <a
                    className="nav-link"
                    id="v-pills-home-tab"
                    data-toggle="pill"
                    href={`#${cnmComplex.maHeThongRap}`}
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                    key={cnmComplex.maHeThongRap}
                  >
                    <img src={cnmComplex.logo} width="50px" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="col-8 col-md-3">
            <div className="tab-content" id="v-pills-tabContent">
              {this.props.cinemaComplex.map((cnmComplex) => {
                return (
                  <div
                    className="tab-pane fade show"
                    id={cnmComplex.maHeThongRap}
                    key={cnmComplex.maHeThongRap}
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    {/* renderComplexBrand */}
                    <div
                      className="nav flex-column nav-pills"
                      id="v-pills-tab-2"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      {cnmComplex.lstCumRap.map((complexBrand) => {
                        return (
                          <a
                            className="nav-link"
                            id="v-pills-home-tab-2"
                            data-toggle="pill"
                            href={`#${complexBrand.maCumRap}`}
                            role="tab"
                            aria-controls="v-pills-home-2"
                            aria-selected="true"
                            key={complexBrand.maCumRap}
                          >
                            <p className="cinecomplex__text">
                              {complexBrand.tenCumRap}
                            </p>
                            <p className="cinecomplex__text text-xs">{complexBrand.diaChi}</p>
                            <Link to={`/cinema-detail/${complexBrand.maCumRap}`} className="text-link text-xs">[chi tiết]</Link>
                          </a>
                        );
                      })}
                    </div>
                    {/*end renderComplexBrand */}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col col-md-7">
            <div className="tab-content" id="v-pills-tabContent-2">
              {this.props.cinemaComplex.map((cnmComplex) => {
                return cnmComplex.lstCumRap.map((complexBrand) => {
                  return (
                    <div
                      className="tab-pane fade show"
                      id={complexBrand.maCumRap}
                      key={complexBrand.maCumRap}
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      {complexBrand.danhSachPhim.map((film) => {
                        return <div key={film.maPhim} className="text-left mb-2">
                           <img src={film.hinhAnh} width='50px' height='50px' className='img-fluid' /> 
                           <div style={{display:"inline"}}>
                           <span className="cinecomplex__text ml-2">{film.tenPhim}</span>
                           <Link to={`/movie-detail/${film.maPhim}`} className="text-xs text-link">[chi tiết]</Link>
                           </div>
                        </div>;
                      })}
                    </div>
                  );
                });
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchAllCnmComplex();
  }
}
const mapStateToProps = (state) => ({
  loading: state.cinemaComplexReducer.loading,
  cinemaComplex: state.cinemaComplexReducer.cinemaComplex,
});
const mapDispatchToProps = (dispatch) => ({
  fetchAllCnmComplex: () => {
    dispatch(actFetchAllCnmComplex());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CinemaComplex);
