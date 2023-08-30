import axios from "axios";
import { getToken } from "../../services/tokenServices";

const apiBackEndTravel= axios.create({
    baseURL: "http://localhost:8080/find",
  })

  apiBackEndTravel.interceptors.request.use((request) => {
    const token = getToken();
    if (token) request.headers['Authorization'] =`Bearer ${getToken()}`;
    return request;
});

export default apiBackEndTravel;