import  movieApi  from "apis/movieApi";
// import { movieApi } from "apis/movieApi";
import { openNotification } from "utils/notification";
import {
  BUY_TICKET_FAIL,
  BUY_TICKET_REQUEST,
  BUY_TICKET_SUCCESS,
  CHOOSE_SEAT,
  FETCH_SEAT_PLAN_FAIL,
  FETCH_SEAT_PLAN_REQUEST,
  FETCH_SEAT_PLAN_SUCCESS,
} from "./types";

const actFetchSeatPlanRequest = () => ({
  type: FETCH_SEAT_PLAN_REQUEST,
});
const actFetchSeatPlanSuccess = (seatPlan) => ({
  type: FETCH_SEAT_PLAN_SUCCESS,
  payload: seatPlan,
});
const actFetchSeatPlanFail = (err) => ({
  type: FETCH_SEAT_PLAN_FAIL,
  payload: err,
});

//CallApi suất chiếu param showtimeId -> seatPlan []
export const actFetchSeatPlan = (showTimeId) => {
  return async (dispatch) => {
    dispatch(actFetchSeatPlanRequest());
    try {
      const { data } = await movieApi.fetchSeatPlanApi(showTimeId);
      dispatch(actFetchSeatPlanSuccess(data));
    } catch (err) {
      dispatch(actFetchSeatPlanFail(err));
    }
  };
};

//Chức năng đặt (chọn ghế)

export const actChooseSeat = (seat) => ({
  type: CHOOSE_SEAT,
  payload: seat,
});

//Chức năng mua vé

const actBuyticketSuccess = () => ({
  type: BUY_TICKET_SUCCESS,
  payload: null,
});
const actBuyticketRequest = () => ({
  type: BUY_TICKET_REQUEST,
  payload: null,
});
const actBuyticketFail = (err) => ({
  type: BUY_TICKET_FAIL,
  payload: err,
});

export const actBuyTicket = (seatPlanInfo, userToken, showTimeId) => {
  return async (dispatch) => {
    dispatch(actBuyticketRequest());
    try {
      const { status } = await movieApi.buyTicketApi(seatPlanInfo, userToken);
      dispatch(actBuyticketSuccess())
      if(status === 200) {
        await dispatch(actFetchSeatPlan(showTimeId))
        openNotification('success', "Mua vé thành công")
      }
    } catch (err) {
      dispatch(actBuyticketFail(err))
    }
  };
};
