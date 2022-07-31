import axios from "axios";

const service = axios.create({
  baseURL: 'http://localhost:10099'
})

service.interceptors.response.use(res => res.data);

export default service;