import axios from "axios";
import { getToken } from "../../services/tokenServices";

const apiBackEndCar= axios.create({
    baseURL: "http://localhost:8080/find",
  })

  apiBackEndCar.interceptors.request.use((request) => {
    const token = getToken();
    if (token) request.headers['Authorization'] =`Bearer ${getToken()}`;
    return request;
});

export default apiBackEndCar;