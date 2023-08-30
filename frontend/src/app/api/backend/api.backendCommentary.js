import axios from "axios";
import { getToken } from "../../services/tokenServices";

const apiBackEndCommentary= axios.create({
    baseURL: "http://localhost:8080/commentary",
  })

  apiBackEndCommentary.interceptors.request.use((request) => {
    const token = getToken();
    if (token) request.headers['Authorization'] =`Bearer ${getToken()}`;
    return request;
});

export default apiBackEndCommentary;