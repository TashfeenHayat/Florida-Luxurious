import axios from "axios";
// export const api_base_URL = "http://localhost:3001/v1/";
// export const api_base_URL = "https://florida-lux-back.waveio.site/v1/";
export const api_base_URL = "http://49.13.149.154:3002/v1/";
export const customAxios = axios.create({
  baseURL: api_base_URL,
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
  },
});

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    } else if (error.response.status === 400) {
      // window.location.href = "/404";
    } else if (error.response.status === 500) {
      window.location.href = "/500";
    }
  }
);

export const google_api_key = "AIzaSyDOaYKraClwvK1D2MuvzRZZ2drrRWVTni0";

export default customAxios;
