import axios from 'axios';
import { jwtDecode } from "jwt-decode";
let baseURL='https://viet-cultural-be.vercel.app/api/v1'
const axiosInstance = axios.create({
  baseURL, 
  headers: {
    'Content-Type': 'application/json',
  },
  
});


const isTokenExpired = (token)=> {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); 
  } catch {
    return true; 
  }
};



const refreshAccessToken = async () => {
  try {
  
    const response = await axios.post(`${baseURL}/auth/refresh-token`);

    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
    //localStorage.removeItem('accessToken');
    throw error;
  }
};


axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('accessToken');

    if (accessToken && isTokenExpired(accessToken)) {
      try {
        accessToken = await refreshAccessToken();
      } catch {
        return Promise.reject('đã hết phiên đăng nhập,vui lòng đăng nhập lại');
      }
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
