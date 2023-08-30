import axios from "axios";

const apiBackEndColorCar= axios.create({
    baseURL: "http://localhost:8080/find",
  })

export default apiBackEndColorCar;