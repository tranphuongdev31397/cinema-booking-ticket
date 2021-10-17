import { AudioOutlined } from "@ant-design/icons";
import { Input, Space, Table } from "antd";
import userApi from "apis/userApi";
import Loader from "components/Loader/Loader";
import SideBar from "components/SideBar/SideBar";
import Button from "components/StandardButton/Button";
import React, { Component } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { GROUP_ID } from "settings/apiConfig";
import {
  DefaultSelectedIndex,
  FAILED_STATUS_CODE,
  LoaiNguoiDung,
  SUCCESS_STATUS_CODE,
} from "settings/appConfig";
import { openNotification } from "utils/notification";
import UserModal from "./user-modal/UserModal";
import "./UserManagement.css";

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

class UserManagement extends Component {
  state = {
    isLoading: false,
    data: [],
    userModalStatus: false,
    user: null,
    isNew: false,
  };
  openEditModal = (text) => {
    this.setState({ userModalStatus: true, user: text, isNew: false });
  };

  openModal = (childData) => {
    this.getListUserPagination();
    this.setState({ userModalStatus: childData });
  };

  deleteUser = (text) => {
    const username = text.taiKhoan;
    const currentUser = this.props.currentUser;
    if (currentUser.taiKhoan == username) {
      openNotification("warning", "Vui lòng không xóa chính mình");
    } else {
      userApi
        .deleteUser(username, currentUser.accessToken)
        .then((result) => {
          if (result.status == SUCCESS_STATUS_CODE) {
            this.getListUserPagination();
            openNotification("success", "Xóa người dùng thành công");
          }
        })
        .catch((error) => {
          if (error.response.status == FAILED_STATUS_CODE) {
            openNotification("warning", error.response.data);
          } else {
            openNotification("error", "Bạn không thể xóa người dùng này");
          }
          console.log(error);
        });
    }
  };

  onSearch = (value) => {
    this.setState({ isLoading: true });
    userApi
      .searchUser(value, this.props.currentUser.accessToken)
      .then((result) => {
        let tableData = [];
        result.data.forEach((element, index) =>
          tableData.push({ ...element, index: index + 1, maNhom: GROUP_ID })
        );
        this.setState({ isLoading: false, data: tableData });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        openNotification("error", "Tìm kiếm lỗi");
        console.log(error);
      });
  };

  columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Mã nhóm",
      key: "maNhom",
      dataIndex: "maNhom",
    },
    {
      title: "Loại người dùng",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text) => (
        <Space size="middle">
          <FaEdit
            className="edit-button"
            onClick={() => this.openEditModal(text)}
          />
          <FaTrashAlt
            className="delete-button"
            onClick={() => {
              this.deleteUser(text);
            }}
          />
        </Space>
      ),
    },
  ];

  getListUserPagination = () => {
    this.setState({ isLoading: true });
    userApi
      .getUserListApi()
      .then((response) => {
        let tableData = [];
        response.data.forEach((element, index) =>
          tableData.push({ ...element, index: index + 1, maNhom: GROUP_ID })
        );
        this.setState({ isLoading: false, data: tableData });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  };

  createUser = () => {
    this.setState({ userModalStatus: true, isNew: true, user: null });
  };

  componentDidMount() {
    this.getListUserPagination();
  }
  render() {
    return this.props.currentUser && this.props.currentUser.maLoaiNguoiDung == LoaiNguoiDung.QUAN_TRI ? (
      <React.Fragment>
        <div className="row">
          <div className="col-2" style={{ paddingLeft: 0 }}>
            <SideBar defaultIndex={DefaultSelectedIndex.UserManagement} />
          </div>

          <div className="col-9" style={{ marginLeft: "80px" }}>
            <div className="row  ml-5">
              <div className="col-11">
                <Search
                  className="mt-4 w-50"
                  placeholder="Tìm kiếm..."
                  allowClear
                  enterButton
                  size="large"
                  onSearch={this.onSearch}
                />
              </div>
              <div className="col-1">
                {" "}
                <Button
                  color="white"
                  background="#1890ff"
                  icon={<FaPlus />}
                  onClick={this.createUser}
                >
                  <span>New</span>
                </Button>
              </div>
            </div>
            <div className="row mt-3">
              {this.state.isLoading ? (
                <Loader />
              ) : (
                <Table
                  columns={this.columns}
                  dataSource={this.state.data}
                  className="user-table"
                  bordered
                />
              )}
            </div>
          </div>
        </div>

        {this.state.userModalStatus && (
          <UserModal
            visible={true}
            userInfo={this.state.user}
            openModal={this.openModal}
            isNew={this.state.isNew}
          />
        )}
      </React.Fragment>
    ) : <Redirect to="/"/>;
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, null)(UserManagement);
