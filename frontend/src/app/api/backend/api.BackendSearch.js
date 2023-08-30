import axios from "axios";

const apiBackendSearch= axios.create({
    baseURL: "http://localhost:8080/find",
  })


  export default apiBackendSearch;