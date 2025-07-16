import axios from "axios";

//export const api_base_URL = "http://localhost:3002/v1/";

//export const api_base_URL = "https://florida-lux-api.onrender.com/v1/";
export const api_base_URL ="https://florida-lux-api-production.up.railway.app/v1/";
// export const api_base_URL = "https://florida-lux-back.waveio.site/v1/";
//export const api_base_URL = "https://florida-lux-nodejs.onrender.com/v1/";
export const customAxios = axios.create({
  baseURL: api_base_URL,

  headers: {
    Authorization: `Bearer ${localStorage.token}`,
    mode: "no-cors",
  },
});

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    } else if (error.response.status === 400) {
      console.log("404");
      // window.location.href = "/404";
    } else if (error.response.status === 500) {
      window.location.href = "/500";
    }
  }
);

export const google_api_key = "AIzaSyDj5Sh-1sAhXGKUjO6M0AcTLhYrFNKjVj4";
// "AIzaSyDOaYKraClwvK1D2MuvzRZZ2drrRWVTni0";

export default customAxios;
