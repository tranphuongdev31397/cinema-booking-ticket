import Loader from "components/Loader/Loader";
import React, { Component } from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import {
  actBuyTicket,
  actChooseSeat,
  actFetchSeatPlan,
} from "./module/actions";
import { openNotification } from "utils/notification";
import "./SeatPlan.css";
import _ from "lodash";
import { UserOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { actFetchUserProfile } from "containers/auth/profileUser/EditProfile/module/actions";
import userApi from "apis/userApi";
class SeatPlan extends Component {
  render() {
    const seatPlanInfo = {
      maLichChieu: this.props.match.params.showTimeId,
      danhSachVe: [],
      taiKhoanNguoiDung: this.props.currentUser.taiKhoan,
    };
    const handleBuyTicket = (seatPlanInfo, userToken) => {
      //Chưa chọn ghế -> thông báo
      if (seatPlanInfo.danhSachVe.length === 0) {
        openNotification("warning", "Vui lòng chọn ghế trước khi đặt");
      } else {
        this.props.buyTicket(
          seatPlanInfo,
          userToken,
          this.props.match.params.showTimeId
        );
      }
    };
    const { danhSachGhe } = this.props.seatPlan;
    if (this.props.loading) return <Loader></Loader>;
    return (
      <div className="seatplan">
        <div className="seatplan__container container-fluid py-5">
          <div className="row">
            <div className="col-xs-12 col-xl-7 seatplan__boxLeft">
              <div className="seatplan__screen">
                <p className="seatplan__text">Màn hình</p>
              </div>
              <div className="seatplan__seatbox">
                {danhSachGhe.map((seat, index) => {
                  let choosingSeat = "choosingSeat";
                  let idx = this.props.arrChoosingSeat.findIndex(
                    (seatChoosing) => {
                      return seat.maGhe === seatChoosing.maGhe;
                    }
                  );
                  if (idx !== -1) {
                    choosingSeat = "choosingSeat";
                  } else {
                    choosingSeat = "";
                  }
                  return (
                    <Fragment key={seat.stt}>
                      <button
                        disabled={seat.daDat}
                        className={`seatplan__seat ${
                          seat.loaiGhe === "Vip" ? "vipSeat" : "normalSeat"
                        } ${choosingSeat} ${
                          seat.daDat
                            ? seat.taiKhoanNguoiDat ===
                              this.props.currentUser.taiKhoan
                              ? "yourSeat"
                              : "choosedSeat"
                            : ""
                        }`}
                        onClick={() => this.props.chooseSeat(seat)}
                      >
                        {seat.daDat ? (
                          seat.taiKhoanNguoiDat ===
                          this.props.currentUser.taiKhoan ? (
                            <UserOutlined />
                          ) : (
                            "X"
                          )
                        ) : (
                          seat.tenGhe
                        )}
                      </button>

                      {(index + 1) % 16 === 0 ? <br /> : ""}
                    </Fragment>
                  );
                })}
              </div>
              <div className="seatplan__seatinfo">
                <h4 className="text-white py-3">Thông tin ghế</h4>
                <div className="row">
                  <div className="col-4">
                    <div className="seatplan__seat normalSeat seatplan__infoBox">
                      00
                    </div>
                    <span className="text-white">Ghế thường</span>
                  </div>
                  <div className="col-4">
                    <div className="seatplan__seat vipSeat seatplan__infoBox">
                      00
                    </div>
                    <span className="text-white">Ghế VIP</span>
                  </div>
                  <div className="col-4">
                    <div className="seatplan__seat choosingSeat seatplan__infoBox">
                      00
                    </div>
                    <span className="text-white">Ghế đang chọn</span>
                  </div>
                  <div className="col-4">
                    <div className="seatplan__seat choosedSeat seatplan__infoBox">
                      X
                    </div>
                    <span className="text-white">Ghế đã được chọn</span>
                  </div>
                  <div className="col-4">
                    <div className="seatplan__seat yourSeat seatplan__infoBox">
                      <UserOutlined />
                    </div>
                    <span className="text-white">Ghế của bạn</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-xl-5 seatplan__info my-5">
              <div className="seatplan__table">
                <div className="row seatplan__tbrow">
                  <div
                    className="col"
                    style={{
                      fontWeight: "600",
                      fontSize: "20px",
                      color: "#ffc75f",
                    }}
                  >
                    {this.props.seatPlan.thongTinPhim.tenPhim}
                  </div>
                </div>
                <div className="row seatplan__tbrow">
                  <div className="col-6 seatplan__tbtitle">
                    Ngày chiếu giờ chiếu
                  </div>
                  <div className="col-6 text-right">
                    {this.props.seatPlan.thongTinPhim.ngayChieu} -{" "}
                    {this.props.seatPlan.thongTinPhim.gioChieu}
                  </div>
                </div>
                <div className="row seatplan__tbrow">
                  <div className="col-6 seatplan__tbtitle">Cụm rạp</div>
                  <div className="col-6 text-right">
                    {this.props.seatPlan.thongTinPhim.tenCumRap}
                  </div>
                </div>
                <div className="row seatplan__tbrow">
                  <div className="col-6 seatplan__tbtitle">Rạp</div>
                  <div className="col-6 text-right">
                    {this.props.seatPlan.thongTinPhim.tenRap}
                  </div>
                </div>
                <div className="row seatplan__tbrow seatplan__tbchoose">
                  <div className="col-6 seatplan__tbtitle">Ghế chọn</div>
                  <div className="col-6 text-right">
                    {
                      // _. : lodash
                      _.sortBy(this.props.arrChoosingSeat, ["tenGhe"]).map(
                        (seat) => {
                          return <span key={seat.maGhe}>{seat.tenGhe}, </span>;
                        }
                      )
                    }
                  </div>
                </div>
                <div className="row seatplan__tbrow">
                  <div className="col-6 seatplan__tbtitle">Ưu đãi</div>
                  <div className="col-6 text-right"></div>
                </div>
                <div className="row seatplan__tbrow">
                  <div className="col-6 seatplan__tbtitle">Tổng tiền</div>
                  <div className="col-6 text-right">
                    {this.props.arrChoosingSeat
                      .reduce((sum, seat) => {
                        return (sum += seat.giaVe);
                      }, 0)
                      .toLocaleString()}{" "}
                    đ
                  </div>
                </div>
                <div className="row seatplan__tbrow">
                  <button
                    className="col seatplan__button"
                    onClick={() => {
                      //Thêm mảng danh sách ghế đã chọn vào mảng danh sách vé API yêu cầu
                      seatPlanInfo.danhSachVe.push(
                        ...this.props.arrChoosingSeat
                      );
                      //Đặt vé
                      handleBuyTicket(
                        seatPlanInfo,
                        this.props.currentUser.accessToken
                      );
                    }}
                  >
                    BOOKING TICKET
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchSeatPlan(this.props.match.params.showTimeId);
  }
}

 export class CheckOutHistory extends Component {
  render() {
    console.log(this.props.userProfile);
    if(this.props.userProfile.length === 0) return (
      <div style={{height:'500px', width:'500px'}}>
        <h3>
          Bạn chưa đặt vé, hãy mua vé nào !!!
        </h3>
      </div>
    )
    return (
      <div className="checkoutHis container">
        <h3 className="text-center">Lịch sử đặt vé của bạn</h3>
        <p className="text-center pb-5">Chúc bạn xem phim vui vẻ</p>
        <div className="row">
          {this.props.userProfile.thongTinDatVe.map(ticketInfo => {
            return (  
          <div className="col-6 col-md-3">
          <div className="card mb-3" style={{ maxWidth: 540 }}>
            <div className="row no-gutters">
              <div className="col-md-12">
                <div className="card-body">
                  <h5 className="card-title">{ticketInfo.tenPhim}</h5>
                  <p className="card-text">
                    Giờ chiếu: - ngày chiếu
                  </p>
                  <p className="card-text">
                    Địa điểm: {ticketInfo.danhSachGhe[0].tenHeThongRap}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                     Tên rạp - ghế: {ticketInfo.danhSachGhe.map(seat => {
                       return (
                         `(${seat.tenCumRap} - ${seat.tenGhe}) `)
                     })}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      
            )
          })}
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

//Tạo tab để chuyển giữa 2 component SeatPlan và CheckOutHistory
const { TabPane } = Tabs;

function callback(key) {

}

class Tab extends Component {
  render() {
    return (
      <div style={{ marginTop: "80px" }}>
        <Tabs defaultActiveKey="1" onChange={() => {
            userApi
            .fetchUserProfileApi({ taiKhoan: this.props.currentUser.taiKhoan })
            .then((res) => {
              this.props.fetchUserProfile(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }}>
          <TabPane tab="CHỌN GHẾ THANH TOÁN" key="1">
            <SeatPlan {...this.props} />
          </TabPane>
          <TabPane tab="KẾT QUẢ ĐẶT VÉ" key="2">
            <CheckOutHistory {...this.props} />
          </TabPane>
        </Tabs>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  loading: state.seatPlanReducer.loading,
  seatPlan: state.seatPlanReducer.seatPlan,
  arrChoosingSeat: state.seatPlanReducer.arrChoosingSeat,
  currentUser: state.authReducer.currentUser,
  userProfile: state.userProfileReducer.userProfile,
});
const mapDispatchToProps = (dispatch) => ({
  //call api
  fetchSeatPlan: (showTimeId) => {
    dispatch(actFetchSeatPlan(showTimeId));
  },
  //Chức năng chọn ghế params seat(ghế đang chọn) -> payload: seat
  chooseSeat: (seat) => {
    dispatch(actChooseSeat(seat));
  },
  buyTicket: (seatPlanInfo, userToken, showTimeId) => {
    dispatch(actBuyTicket(seatPlanInfo, userToken, showTimeId));
  },
  fetchUserProfile: (userProfile) => {
    dispatch(actFetchUserProfile(userProfile));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Tab);
