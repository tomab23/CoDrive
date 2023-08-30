import axios from "axios";
import { getToken } from "../../services/tokenServices";

const apiBackEndBooking = axios.create({
    baseURL: "http://localhost:8080/booking",
  })

  apiBackEndBooking.interceptors.request.use((request) => {
    const token = getToken();
    if (token) request.headers['Authorization'] =`Bearer ${getToken()}`;
    return request;
});

export default apiBackEndBooking;