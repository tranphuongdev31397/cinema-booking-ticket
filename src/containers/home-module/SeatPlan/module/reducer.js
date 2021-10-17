import { openNotification } from "utils/notification";
import {
  BUY_TICKET_REQUEST,
  BUY_TICKET_SUCCESS,
  CHOOSE_SEAT,
  FETCH_SEAT_PLAN_FAIL,
  FETCH_SEAT_PLAN_REQUEST,
  FETCH_SEAT_PLAN_SUCCESS,
} from "./types";

const initialState = {
  seatPlan: [],
  loading: true,
  err: "",
  arrChoosingSeat: [],
};

const seatPlanReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SEAT_PLAN_REQUEST:
      return { ...state, loading: true };
    case FETCH_SEAT_PLAN_SUCCESS:
      return { ...state, loading: false, seatPlan: payload };
    case FETCH_SEAT_PLAN_FAIL:
      return { ...state, loading: false, err: payload };

    case CHOOSE_SEAT:
      const arrChoosingSeatUpdate = [...state.arrChoosingSeat];
      let index = arrChoosingSeatUpdate.findIndex((seat) => {
        return seat.maGhe === payload.maGhe;
      });
      if (index !== -1) {
        arrChoosingSeatUpdate.splice(index, 1);
      } else {
        arrChoosingSeatUpdate.push(payload);
      }
      return { ...state, arrChoosingSeat: arrChoosingSeatUpdate };

    //Chức năng mua vé
    case BUY_TICKET_SUCCESS:
      
      return { ...state, arrChoosingSeat: [] };

    default:
      return state;
  }
};

export default seatPlanReducer;
