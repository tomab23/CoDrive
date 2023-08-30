import axios from "axios";
import { getToken } from "../../services/tokenServices";

const apiBackEndPayment = axios.create({
    baseURL: "http://localhost:8080/payment",
  })

  apiBackEndPayment.interceptors.request.use((request) => {
    const token = getToken();
    if (token) request.headers['Authorization'] =`Bearer ${getToken()}`;
    return request;
});

export default apiBackEndPayment;