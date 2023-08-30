import axios from "axios";

const apiBackendInfo = axios.create({
    baseURL: "http://localhost:8080/info",
  })

  export default apiBackendInfo;