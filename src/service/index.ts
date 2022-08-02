import axios from "axios";

export const baseURL = 'http://localhost:9999';

const service = axios.create({
  baseURL
})

service.interceptors.response.use(res => res.data);

export default service;