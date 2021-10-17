import axios from "axios";
import { BASE_URL } from "settings/apiConfig";

// apis are called here
export const callApi = (endpoint, method = "GET", data = null, token = null) => {
  return axios({
    url: `${BASE_URL}/${endpoint}`,
    method,
    data,
    headers: {
        Authorization: `Bearer ${token}`
    }
  });
};

// API POST
