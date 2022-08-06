import axios from "axios";

export const baseURL = 'http://localhost:9999';

const service = axios.create({
  baseURL
})

type CommonResponse = {
  code: number;
  data: any;
  message: string;
}

service.interceptors.response.use(res => res.data);
service.interceptors.response.use((res: any) => {
  if (res.code !== 1) {
    return Promise.reject(res.message);
  }
  return res.data;
});

export default service;