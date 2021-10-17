import { connect } from "react-redux";
import React, { Component } from "react";
import "./EditProfile.css";
import { actFetchUserProfile } from "./module/actions";
import { Form, Field, Formik, ErrorMessage } from "formik";
import userApi from "apis/userApi";
import Loader from "components/Loader/Loader";
import { actEditProfile } from "containers/auth/module/action";
import * as yup from "yup";
import { CheckCircleOutlined } from "@ant-design/icons";

const editProfileSchema = yup.object().shape({
  matKhau: yup.string().required("(*) Mật khẩu không được để trống"),
  hoTen: yup
    .string()
    .required("(*) Họ tên không được để trống")
    .matches( /^[^0-9]+$/g, "(*) Họ tên không được có số")
    .matches(
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
      "(*) Họ tên khôn đúng định dạng"
    ),
  email: yup
    .string()
    .required("(*) Email không được để trống")
    .email("(*) Email không đúng định dạng, Vd: abc@xyz.com"),
  soDt: yup
    .string()
    .required("(*) Số điện thoại không được để trống")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8,9})\b/g, "(*) Số điện thoại không đúng định dạng, hoặc không thuộc Việt Nam"),
});
class EditProfile extends Component {
  render() {
    const handleOnSubmit = (values) => {
      const valuesUpdate = { ...values };
      userApi
        .editProfileApi(valuesUpdate, this.props.currentUser.accessToken)
        .then((res) => {
          const currentUserUpdate = { ...this.props.currentUser, ...res.data };
          delete currentUserUpdate.thongTinDatVe;
          delete currentUserUpdate.loaiNguoiDung;
          delete currentUserUpdate.matKhau;
          this.props.editProfile(currentUserUpdate);
          if (res.status === 200) {
            document.getElementById("btnModal").click();
            setTimeout(() => {
              document.getElementById("closeModal").click();
            },1000)
          }
        });
    };
    if (this.props.userProfile.length === 0) return <Loader />;
    return (
      <div className="editprofile">
        <div className="container editprofile__container">
          <h1 className="text-center">Thay đổi thông tin cá nhân</h1>
          <div className="editprofile__avatar  text-center">
            <div className="avatar">
              <img src="https://picsum.photos/200" className="img__avatar" />
            </div>
            <div className="editprofile__name">
              <h4 className="py-4">{this.props.userProfile.hoTen}</h4>
            </div>
          </div>
          <Formik
            initialValues={{
              ...this.props.currentUser,
              matKhau: this.props.userProfile.matKhau,
              soDt: this.props.currentUser.soDT,
            }}
            validationSchema={editProfileSchema}
            onSubmit={handleOnSubmit}
            render={(formikProps) => (
              <Form>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label /> Họ và tên
                      <Field
                        type="text"
                        className="form-control"
                        name="hoTen"
                        onChange={formikProps.handleChange}
                      />
                      <ErrorMessage name="hoTen">
                        {(msg) => (
                          <div className="alert alert-danger">{msg}</div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label /> Email
                      <Field
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={formikProps.handleChange}
                      />
                    </div>
                    <ErrorMessage name="email">
                      {(msg) => <div className="alert alert-danger">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label /> Số điện thoại
                      <Field
                        type="text"
                        className="form-control"
                        name="soDt"
                        onChange={formikProps.handleChange}
                      />
                      <ErrorMessage name="soDt">
                        {(msg) => (
                          <div className="alert alert-danger">{msg}</div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label /> Mật khẩu
                      <Field
                        type="password"
                        className="form-control"
                        name="matKhau"
                        onChange={formikProps.handleChange}
                      />
                      <ErrorMessage name="matKhau">
                        {(msg) => (
                          <div className="alert alert-danger">{msg}</div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button
                    type="submit"
                    className="button__main homeApp__btn"
                    id="btn__submit"
                  >
                    Xác nhận thay đổi
                  </button>
                </div>
              </Form>
            )}
          />
        </div>

        {/* Modal Here */}
        {/* Modal popup */}
        <button
          type="button"
          data-toggle="modal"
          data-target="#editProfileModal"
          id="btnModal"
          className="d-none"
        >
          Launch modal
        </button>
        <div
          className="modal"
          tabIndex={-1}
          role="dialog"
          id="editProfileModal"
        >
          <div className="modal__container d-flex justify-content-center align-items-center w-100 h-100">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header d-none">
                  <h5 className="modal-title">Thông báo</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" id="closeModal">
                      ×
                    </span>
                  </button>
                </div>
                <div className="modal-body d-flex justify-content-center flex-column" style={{height:'300px', width: '500px'}}>
                  <CheckCircleOutlined className="icon__modal" />
                  <h3 className="py-3 font-weight-bold text-center">
                    Thay đổi thông tin thành công
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    userApi
      .fetchUserProfileApi({ taiKhoan: this.props.currentUser.taiKhoan })
      .then((res) => {
        this.props.fetchUserProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
  userProfile: state.userProfileReducer.userProfile,
});
const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile: (userProfile) => {
    dispatch(actFetchUserProfile(userProfile));
  },
  editProfile: (userProfileUpdate) => {
    dispatch(actEditProfile(userProfileUpdate));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
