import React, { Component } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import userApi from "apis/userApi";
import { Link, Redirect } from "react-router-dom";
import { GROUP_ID } from "settings/apiConfig";
import "./Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";

//Validation
const registerSchema = yup.object().shape({
  taiKhoan: yup.string().required("(*) Tài khoản không được để trống"),
  matKhau: yup.string().required("(*) Mật khẩu không được để trống"),
  hoTen: yup
    .string()
    .required("(*) Họ tên không được để trống")
    .matches(
      /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
      "(*) Họ tên khôn đúng định dạng"
    ),
  email: yup
    .string()
    .required("(*) Email không được để trống")
    .email("(*) Email không đúng định dạng, Vd: abc@xyz.com"),
  soDt: yup
    .string()
    .required("(*) Số điện thoại không được để trống")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "(*) Số điện thoại không đúng"),
});

class Register extends Component {
  state = {
    error: null,
  };
  render() {
    const handleOnSubmit = (values) => {
      userApi
        .registerApi(values)
        .then((res) => {
          if (res.status === 200) {
            document.getElementById("btnModal").click();
          }
        })
        .catch((err) => {
          this.setState({
            error: "Tài khoản hoặc email bị đã có, vui lòng kiểm tra lại",
          });
        });
    };
    const closeModal = () => {
      document.getElementById("closeModal").click();
    };

    return !this.props.currentUser ? (
      <div className="register">
        <div className="register__container container">
          <div className="h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: 25 }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 register__formControl">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          Đăng kí
                        </p>
                        {this.state.error && (
                          <div className="alert alert-danger">
                            {this.state.error}
                          </div>
                        )}
                        {/* FORMIK HERE */}
                        <Formik
                          initialValues={{
                            maLoaiNguoiDung: "KhachHang",
                            maNhom: GROUP_ID,
                          }}
                          validationSchema={registerSchema}
                          onSubmit={handleOnSubmit}
                          render={(formikProps) => (
                            <Form className="mx-1 mx-md-4 register__form">
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-user fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    htmlFor="form3Example1c"
                                  >
                                    Tài khoản
                                  </label>
                                  <Field
                                    type="text"
                                    id="form3Example1c"
                                    name="taiKhoan"
                                    className="form-control"
                                    onChange={formikProps.handleChange}
                                  />
                                  <ErrorMessage name="taiKhoan">
                                    {(msg) => (
                                      <div className="alert alert-danger">
                                        {msg}
                                      </div>
                                    )}
                                  </ErrorMessage>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    htmlFor="form3Example3c"
                                  >
                                    Email
                                  </label>
                                  <Field
                                    type="email"
                                    id="form3Example3c"
                                    className="form-control"
                                    name="email"
                                    onChange={formikProps.handleChange}
                                  />
                                  <ErrorMessage name="email">
                                    {(msg) => (
                                      <div className="alert alert-danger">
                                        {msg}
                                      </div>
                                    )}
                                  </ErrorMessage>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    htmlFor="form3Example4c"
                                  >
                                    Mật khẩu
                                  </label>
                                  <Field
                                    type="password"
                                    id="form3Example4c"
                                    className="form-control"
                                    name="matKhau"
                                    onChange={formikProps.handleChange}
                                  />
                                  <ErrorMessage name="matKhau">
                                    {(msg) => (
                                      <div className="alert alert-danger">
                                        {msg}
                                      </div>
                                    )}
                                  </ErrorMessage>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-key fa-lg me-3 fa-fw" />

                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    htmlFor="form3Example4cda"
                                  >
                                    Xác nhận mật khẩu
                                  </label>
                                  <input
                                    type="password"
                                    id="form3Example4cda"
                                    className="form-control"
                                    name="rpMatKhau"
                                  />
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-key fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    htmlFor="form3Example4cdf"
                                  >
                                    Họ và tên
                                  </label>
                                  <Field
                                    type="text"
                                    id="form3Example4cdf"
                                    className="form-control"
                                    name="hoTen"
                                    onChange={formikProps.handleChange}
                                  />
                                  <ErrorMessage name="hoTen">
                                    {(msg) => (
                                      <div className="alert alert-danger">
                                        {msg}
                                      </div>
                                    )}
                                  </ErrorMessage>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-key fa-lg me-3 fa-fw" />
                                <div className="form-outline flex-fill mb-0">
                                  <label
                                    className="form-label"
                                    htmlFor="form3Example4cde"
                                  >
                                    Số điện thoại
                                  </label>
                                  <Field
                                    type="text"
                                    id="form3Example4cde"
                                    className="form-control"
                                    name="soDt"
                                    onChange={formikProps.handleChange}
                                  />
                                  <ErrorMessage name="soDt">
                                    {(msg) => (
                                      <div className="alert alert-danger">
                                        {msg}
                                      </div>
                                    )}
                                  </ErrorMessage>
                                </div>
                              </div>

                              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button
                                  type="submit"
                                  className="button__main homeApp__btn"
                                  id="btn__submit"
                                >
                                  Đăng kí
                                </button>
                              </div>
                            </Form>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal popup */}
        <button
          type="button"
          data-toggle="modal"
          data-target="#registerModal"
          id="btnModal"
          className="d-none"
        >
          Launch modal
        </button>
        <div className="modal" tabIndex={-1} role="dialog" id="registerModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
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
              <div className="modal-body">
                <CheckCircleOutlined className="icon__modal" />
                <h3 className="py-3 font-weight-bold">Đăng kí thành công</h3>
              </div>
              <div className="modal-footer">
                <Link
                  to="/login"
                  className="button__main homeApp__btn"
                  onClick={closeModal}
                >
                  Đăng nhập ngay
                </Link>
                <span className="d-3 font-weight-bold">hoặc</span>
                <Link
                  to="/"
                  className="button__main homeApp__btn"
                  onClick={closeModal}
                >
                  Trở lại trang chủ
                </Link>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps)(Register);
