import { Space, Table } from "antd";
import movieApi from "apis/movieApi";
import Loader from "components/Loader/Loader";
import SideBar from "components/SideBar/SideBar";
import Button from "components/StandardButton/Button";
import React, { Component } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import Moment from "react-moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  DefaultSelectedIndex,
  FAILED_STATUS_CODE,
  LoaiNguoiDung,
  SUCCESS_STATUS_CODE
} from "settings/appConfig";
import { openNotification } from "utils/notification";
import "./MovieManagement.css";
import { Redirect } from "react-router";

class MovieManagement extends Component {
  state = {
    isLoading: false,
    movieList: null,
  };
  columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      width: "4%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => (
        <img src={text} alt="movie image" className="movie-image" />
      ),
      width: "10%",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: "15%",
    },

    {
      title: "Bí danh",
      dataIndex: "biDanh",
      key: "biDanh",
      width: "15%",
    },

    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mô tả",
      key: "moTa",
      dataIndex: "moTa",
      render: (text) =>
        text.length <= 50 ? <p>{text}</p> : <p>{text.slice(0, 99) + "..."}</p>,
      width: "20%",
    },

    {
      title: "Ngày khởi chiếu",
      key: "ngayKhoiChieu",
      dataIndex: "ngayKhoiChieu",
      width: "10%",
      render: (text) => <Moment format="DD/MM/YYYY ">{text}</Moment>,
    },
    {
      title: "Đánh giá",
      key: "danhGia",
      dataIndex: "danhGia",
      width: "5%",
    },
    {
      title: "Thao tác",
      key: "action",
      width: "5%",
      render: (text) => (
        <Space size="middle">
          <FaEdit
            className="edit-button"
            onClick={() => {
              this.props.history.push(`/admin/movie-management/${text.maPhim}`);
            }}
          />
          <FaTrashAlt
            className="delete-button"
            onClick={() => {
              this.deleteMovie(text.maPhim);
            }}
          />
        </Space>
      ),
    },
  ];

  getAllMovieList = () => {
    this.setState({ isLoading: true });
    movieApi
      .fetchAllMovieApi()
      .then((result) => {
        this.setState({ movieList: result.data, isLoading: false });
      })
      .then((error) => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllMovieList();
  }

  deleteMovie = (maPhim) => {
    this.setState({ isLoading: true });
    movieApi
      .deleteMovieInfo(maPhim, this.props.currentUser.accessToken)
      .then((result) => {
        if (result.status == SUCCESS_STATUS_CODE) {
          this.getAllMovieList();
          openNotification("success", "Xóa phim thành công");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == FAILED_STATUS_CODE) {
          openNotification("warning", error.response.data);
        } else {
          openNotification("error", "Không thể xóa phim!");
        }
      });
  };

  render() {
    return (
     
      this.props.currentUser && this.props.currentUser.maLoaiNguoiDung == LoaiNguoiDung.QUAN_TRI ? (<div className="row">
      <div className="col-2" style={{ paddingLeft: 0 }}>
        <SideBar defaultIndex={DefaultSelectedIndex.MovieManagement} />
      </div>
      <div className="col-9" style={{ marginLeft: "80px" }}>
        <div className="row justify-content-end">
          {" "}
          <Link to="/admin/movie-management/-1">
            <Button
              color="white"
              background="#1890ff"
              icon={<FaPlus />}
              onClick={this.createUser}
            >
              New
            </Button>
          </Link>
        </div>
        <div className="row mt-3">
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <Table
              columns={this.columns}
              dataSource={this.state.movieList}
              className="user-table"
              bordered
            />
          )}
        </div>
      </div>
    </div>) : <Redirect to="/"/>
     
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});
export default connect(mapStateToProps, null)(MovieManagement);
