import axios from "axios";
import { getToken } from "../../services/tokenServices";

const apiBackEndTransaction = axios.create({
    baseURL: "http://localhost:8080/transaction",
  })

  apiBackEndTransaction.interceptors.request.use((request) => {
    const token = getToken();
    if (token) request.headers['Authorization'] =`Bearer ${getToken()}`;
    return request;
});

export default apiBackEndTransaction;