import axios from "axios";
import { getToken } from "../../services/tokenServices";

const apiBackEndImage= axios.create({
    baseURL: "http://localhost:8080/image",
  })

  apiBackEndImage.interceptors.request.use((request) => {
    const token = getToken();
    if (token) request.headers['Authorization'] =`Bearer ${getToken()}`;
    return request;
});

export default apiBackEndImage;