import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Loader from "components/Loader/Loader";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { actLogin } from "../module/action";
import "./LoginPage.css";
import { Link } from 'react-router-dom'

class LoginPage extends Component {
  history = this.props.history;

  onFinish = (values) => {
    this.props.dispatchLogin(values, this.history);
  };

  render() {
    if (this.props.currentUser) {
      return <Redirect to="/" />;
    } else {
      if (this.props.loading) return <Loader></Loader>;
      return (
        <div className="login__container">
          <div className="form__control">
            <Form
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 16,
              }}
              name="normal_login"
              className="login-form formation "
              onFinish={this.onFinish}
            >
              <h1 className="d-flex justify-content-center color-white pb-4">
                Đăng nhập
              </h1>
              {this.props.error && (
                <div className="alert alert-danger">{this.props.error}</div>
              )}
              <Form.Item
                className="pb-4 login-label"
                label="Tên đăng nhập"
                name="taiKhoan"
                rules={[
                  {
                    required: true,
                    message: "Tài khoản không được trống!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                className="pb-3 login-label"
                label="Mật khẩu"
                name="matKhau"
                rules={[
                  {
                    required: true,
                    message: "Phải có mật khẩu!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <div className="login__action">
                <Form.Item>
                  <Button
                    type="primary "
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <Form.Item>
                  <div className="span-deco">Hoặc</div>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="default"
                    htmlType="submit"
                    className="login-form-button register-button"
                  >
                    <Link to="./register"> Đăng kí</Link>
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (user, history) => {
    dispatch(actLogin(user, history));
  },
});

const mapStateToProps = (state) => ({
  loading: state.authReducer.loading,
  error: state.authReducer.error,
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
