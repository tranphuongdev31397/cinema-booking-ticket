import React, { Component } from "react";

import './HomeNew.css'


export default class HomeNew extends Component {
  render() {
    return (
        <div className="container homenew">
          <nav>
            <div className="nav nav-tabs d-flex justify-content-center" id="nav-tab" role="tablist">
              <a
                className="nav-link active nav__pillItem"
                id="nav-home-tab"
                data-toggle="tab"
                href="#nav-home"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Điện Ảnh 24h
              </a>
              <a
                className="nav-link nav__pillItem"
                id="nav-profile-tab"
                data-toggle="tab"
                href="#nav-profile"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Review
              </a>
              <a
                className="nav-link nav__pillItem"
                id="nav-contact-tab"
                data-toggle="tab"
                href="#nav-contact"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Khuyến Mãi
              </a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              Chưa có tin tức mới
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
             Chưa có tin tức mới
            </div>
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              Chưa có tin tức mới
            </div>
          </div>
        </div>
    );
  }
}
