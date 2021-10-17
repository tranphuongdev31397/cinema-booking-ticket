import React, { Component } from "react";
import { connect } from "react-redux";
import "./TopBar.css";
import { actLogOut } from "containers/auth/module/action";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class TopBar extends Component {
  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/");
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between all">
        <Link className="navbar-brand" to="/">
          <img
            src="https://tix.vn/app/assets/img/icons/web-logo.png"
            className="icon"
          />{" "}
          <span className="header">Tix Admin</span>
        </Link>

        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <img
                src="https://picsum.photos/30"
                className="rounded-circle avatar"
                alt="Cinque Terre"
              />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Hello, {this.props.currentUser && this.props.currentUser.hoTen}
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/edit-profile">
                Thay đổi thông tin
              </Link>
              <a className="dropdown-item" href="#" onClick={this.handleLogout}>
                Đăng xuất
              </a>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authReducer.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(actLogOut()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));
