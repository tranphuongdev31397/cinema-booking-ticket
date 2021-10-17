import React, { Component } from "react";
import "./Banner.css";
import Slider from "react-slick";
import SearchTool from "../SearchTool/SearchTool";

export default class Banner extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
    return (
      <div className="carousel carousel__container">
        <Slider {...settings}>
          <div className="carousel-item active">
            <img
              src="https://s3img.vcdn.vn/123phim/2021/04/ban-tay-diet-quy-evil-expeller-16177781815781.png"
              className="d-block w-100 img-fluid carousel__img"
            />

            <button className="btnPlay">
              <img src="https://tix.vn/app/assets/img/icons/play-video.png" />
            </button>
          </div>
          <div className="carousel-item">
            <img
              src="https://s3img.vcdn.vn/123phim/2021/04/lat-mat-48h-16177782153424.png"
              className="d-block w-100 img-fluid carousel__img"
              alt="..."
            />

            <button className="btnPlay">
              <img src="https://tix.vn/app/assets/img/icons/play-video.png" />
            </button>
          </div>
          <div className="carousel-item">
            <img
              src="https://s3img.vcdn.vn/123phim/2021/04/trang-ti-16194117174325.jpg"
              className="d-block w-100 img-fluid carousel__img"
              style={{ height: "500px" }}
              alt="..."
            />
            <button className="btnPlay">
              <img src="https://tix.vn/app/assets/img/icons/play-video.png" />
            </button>
          </div>
        </Slider>
        <SearchTool />
      </div>
    );
  }
}
