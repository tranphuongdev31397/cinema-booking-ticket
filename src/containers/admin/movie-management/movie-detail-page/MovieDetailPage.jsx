import { InboxOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, message, Rate, Upload } from "antd";
import movieApi from "apis/movieApi";
import SideBar from "components/SideBar/SideBar";
import TopBar from "components/TopBar/TopBar";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { GROUP_ID } from "settings/apiConfig";
import {
  DefaultSelectedIndex,
  FAILED_STATUS_CODE,
  SUCCESS_STATUS_CODE,
} from "settings/appConfig";
import { openNotification } from "utils/notification";
import "./MovieDetailPage.css";

const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

class MovieDetailPage extends Component {
  state = {
    movieInfo: {},
    isLoading: false,
    isNew: false,
    error: null,
  };
  dateFormat = "DD/MM/YYYY";

  validateForm = async () => {
    let result = true;
    this.setState({
      error: {
        tenPhimError: "",
        biDanhError: "",
        trailerError: "",
        moTaError: "",
        danhGiaError: "",
        hinhAnhError: "",
      },
    });
    const { tenPhim, biDanh, trailer, moTa, danhGia, hinhAnh } =
      this.state.movieInfo;
    if (!tenPhim || tenPhim.length < 3 || tenPhim.length > 100) {
      // set state is asynchronous function so need to use await for set state .
      await this.setState({
        error: {
          ...this.state.error,
          tenPhimError: "Tên phim phải từ 3 kí tự",
        },
      });
      result = false;
    }
    if (!biDanh || biDanh.length < 3 || biDanh.length > 100) {
      await this.setState({
        error: {
          ...this.state.error,
          biDanhError: "Bí danh phải từ 3  kí tự",
        },
      });
      result = false;
    }
    if (!trailer || trailer.length < 3 || trailer.length > 100) {
      await this.setState({
        error: {
          ...this.state.error,
          trailerError: "Trailer phải từ 3 đến 50 kí tự",
        },
      });
      result = false;
    }
    if (!moTa || moTa.length < 3 || moTa.length > 1000) {
      await this.setState({
        error: {
          ...this.state.error,
          moTaError: "Mô tả phải từ 3 kí tự trở lên",
        },
      });
      result = false;
    }
    if (!danhGia) {
      await this.setState({
        error: {
          ...this.state.error,
          danhGiaError: "Phim cần có đánh giá",
        },
      });
      result = false;
    }
    if (!hinhAnh) {
      await this.setState({
        error: {
          ...this.state.error,
          hinhAnhError: "Hình ảnh ko hợp lệ",
        },
      });
      result = false;
    }
    return result;
  };

  onFinish = async () => {
    if (await this.validateForm()) {
      const index = this.state.movieInfo.trailer.indexOf("=");
      index != -1 &&
        this.setState({
          movieInfo: {
            ...this.state.movieInfo,
            trailer: this.state.movieInfo.trailer.slice(index + 1, index + 12),
          },
        });

      if (this.state.isNew) {
        this.setState({
          movieInfo: {
            ...this.state.movieInfo,
            maNhom: GROUP_ID,
            ngayKhoiChieu: moment(this.state.movieInfo.ngayKhoiChieu).format(
              "DD/MM/YYYY"
            ),
          },
        });
        let formData = new FormData();
        for (let key in this.state.movieInfo) {
          formData.append(key, this.state.movieInfo[key]);
        }
        movieApi
          .addMovieApi(formData)
          .then((result) => {
            if (result.status == SUCCESS_STATUS_CODE) {
              this.props.history.goBack();
              openNotification("success", "Thêm phim thành công");
            }
          })
          .catch((error) => {
            if (error.response.status == FAILED_STATUS_CODE) {
              openNotification("warning", error.response.data);
            } else {
              openNotification("error", "Không thể thêm phim!");
            }
            console.log(error);
          });
      } else {
        // backend only receive value DD/MM/YYYY so parse value to DD/MM/YYYY for backend
        this.setState({
          movieInfo: {
            ...this.state.movieInfo,
            ngayKhoiChieu: moment(this.state.movieInfo.ngayKhoiChieu).format(
              "DD/MM/YYYY"
            ),
          },
        });
        let formData = new FormData();
        for (let key in this.state.movieInfo) {
          formData.append(key, this.state.movieInfo[key]);
        }
        movieApi
          .updateMovieInfo(formData, this.props.token)
          .then((result) => {
            if (result.status == SUCCESS_STATUS_CODE) {
              this.props.history.goBack();
              openNotification("success", "Cập nhật phim thành công");
            }
          })
          .catch((error) => {
            console.log(error.response);
            if (error.response.status == FAILED_STATUS_CODE) {
              openNotification("warning", error.response.data);
            } else {
              openNotification("error", "Không thể cập nhật phim!");
            }
            console.log(error);
          });
      }
    }
  };

  //get file when upload
  normFile = (e) => {
    // if hanving photto upload, get the first one for hinhAnh field
    e.fileList[0] &&
      this.setState({
        movieInfo: {
          ...this.state.movieInfo,
          hinhAnh: e.fileList[0].originFileObj,
        },
      });
  };

  //check file upload is image or not, the storage must be smaller than 2mb
  checkImageUpload(file) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/gif";

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M ? true : Upload.LIST_IGNORE;
  }
  // Can not select days before today and today
  disabledDate = (current) => current && current <= moment().endOf("day");

  componentDidMount() {
    const { movieId } = this.props.match.params;
    if (movieId != -1) {
      this.setState({ isLoading: true });
      movieApi
        .fetchMovieDetailApi(movieId)
        .then((result) => {
          this.setState({ isLoading: false });

          const data = result.data;
          this.setState({
            movieInfo: {
              ...this.state.movieInfo,
              maNhom: GROUP_ID,
              tenPhim: data.tenPhim,
              biDanh: data.biDanh,
              trailer: data.trailer,
              ngayKhoiChieu: data.ngayKhoiChieu,
              moTa: data.moTa,
              danhGia: data.danhGia,
              hinhAnh: data.hinhAnh,
              maPhim: data.maPhim,
            },
          });
        })
        .then((error) => {
          console.log(error);
        });
    } else {
      this.setState({ isNew: true, isLoading: false });
    }
  }

  handleTenPhim = (e) => {
    const value = e.target.value;
    this.setState({ movieInfo: { ...this.state.movieInfo, tenPhim: value } });
  };
  handleBiDanh = (e) => {
    const value = e.target.value;
    this.setState({ movieInfo: { ...this.state.movieInfo, biDanh: value } });
  };
  handleTrailer = (e) => {
    const value = e.target.value;
    this.setState({ movieInfo: { ...this.state.movieInfo, trailer: value } });
  };
  handleNgayKhoiChieu = (date, dateString) => {
    if (date != null) {
      // parse date string to UTC to show the correct date
      const chosenDate = new moment(date._d).utc().format();
      this.setState({
        movieInfo: { ...this.state.movieInfo, ngayKhoiChieu: chosenDate },
      });
    }
  };
  handleMoTa = (e) => {
    const value = e.target.value;
    this.setState({ movieInfo: { ...this.state.movieInfo, moTa: value } });
  };
  handleRate = (value) => {
    this.setState({ movieInfo: { ...this.state.movieInfo, danhGia: value } });
  };

  render() {
    return (
      <div className="container-fluid" style={{ margin: 0, padding: 0 }}>
        <div className="row">
          <div className="col-2">
            <SideBar defaultIndex={DefaultSelectedIndex.MovieManagement} />
          </div>
          <div className="col-9 div-table ml-5">
            <div className="row justify-content-center my-3">
              <h3 className="text-warning">Thông Tin Phim</h3>
            </div>

            {!this.state.isLoading && (
              <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={this.onFinish}
              >
                <Form.Item label="Mã nhóm: ">
                  <Input value={GROUP_ID} disabled />
                </Form.Item>
                {!this.state.isNew && (
                  <Form.Item label="Mã phim: ">
                    <Input
                      value={
                        this.state.movieInfo ? this.state.movieInfo.maPhim : ""
                      }
                      disabled
                    />
                  </Form.Item>
                )}
                <Form.Item label="Tên phim:">
                  <Input
                    value={
                      this.state.movieInfo ? this.state.movieInfo.tenPhim : ""
                    }
                    onChange={this.handleTenPhim}
                  />
                  <p className="text-danger">
                    {this.state.error && this.state.error.tenPhimError}
                  </p>
                </Form.Item>
                <Form.Item label="Bí danh phim:">
                  <Input
                    value={
                      this.state.movieInfo ? this.state.movieInfo.biDanh : ""
                    }
                    onChange={this.handleBiDanh}
                  />
                  <p className="text-danger">
                    {this.state.error && this.state.error.biDanhError}
                  </p>
                </Form.Item>
                <Form.Item label="Trailer phim:">
                  <Input
                    value={
                      this.state.movieInfo ? this.state.movieInfo.trailer : ""
                    }
                    onChange={this.handleTrailer}
                  />
                  <p className="text-danger">
                    {this.state.error && this.state.error.trailerError}
                  </p>
                </Form.Item>

                <Form.Item label="Ngày khởi chiếu:">
                  <DatePicker
                    placeholder="Chọn ngày"
                    format={this.dateFormat}
                    value={
                      this.state.movieInfo
                        ? moment(this.state.movieInfo.ngayKhoiChieu)
                        : moment(new Date())
                    }
                    disabledDate={this.disabledDate}
                    onChange={this.handleNgayKhoiChieu}
                  />
                </Form.Item>

                <Form.Item label="Mô tả:">
                  <TextArea
                    rows={5}
                    value={
                      this.state.movieInfo ? this.state.movieInfo.moTa : ""
                    }
                    onChange={this.handleMoTa}
                  />
                  <p className="text-danger">
                    {this.state.error && this.state.error.moTaError}
                  </p>
                </Form.Item>

                <Form.Item label="Rate">
                  <Rate onChange={this.handleRate} />
                  <p className="text-danger">
                    {this.state.error && this.state.error.danhGiaError}
                  </p>
                </Form.Item>
                {!this.state.isNew && (
                  <Form.Item label="Hình ảnh hiện tại: ">
                    <img
                      src={this.state.movieInfo && this.state.movieInfo.hinhAnh}
                      alt="Hình ảnh phim"
                      className="image-movie d-flex justify-content-center"
                    />
                  </Form.Item>
                )}

                <Form.Item label="Hình ảnh mới:">
                  <Form.Item valuePropName="fileList" noStyle>
                    <Upload.Dragger
                      name="files"
                      action="/upload.do"
                      maxCount={1}
                      listType="picture"
                      beforeUpload={this.checkImageUpload}
                      onChange={this.normFile}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Ấn hoặc kéo thả hình ảnh vào khu vực này
                      </p>
                      <p className="ant-upload-hint">
                        Bạn chỉ có thể upload 1 hình ảnh
                      </p>
                    </Upload.Dragger>
                    <p className="text-danger">
                      {this.state.error && this.state.error.hinhAnhError}
                    </p>
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  wrapperCol={{ offset: 16 }}
                  style={{ marginTop: "40px" }}
                >
                  <Button style={{ height: "40px" }}>Hủy</Button>
                  <Button
                    htmlType="button"
                    style={{ margin: "0 15px", height: "40px" }}
                    type="primary"
                    htmlType="submit"
                  >
                    {this.state.isNew ? "Thêm phim" : "Cập nhật"}
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.authReducer.currentUser.accessToken,
});

export default connect(mapStateToProps, null)(MovieDetailPage);
