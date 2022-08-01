import axios from 'axios'
// import env from "react-dotenv";

//i need to change base url to get form env var 

const axiosInstance = axios.create({
    baseURL:  process.env.REACT_APP_API_URL
})  

export function setToken(config: any, idToken = '') {
    let userType = sessionStorage.getItem("userType")
    if (idToken && idToken !== "") {
      config.headers.common[userType === "admin" ? 'admin-token' : 'token'] = `${idToken}`
    }
  }

axiosInstance.interceptors.request.use(config => {
    let token =  sessionStorage.getItem('sessionId')
    if (token) {
      setToken(config, token);
    }
    return config
     }, error => {
    return Promise.reject(error)
  });
  

  axiosInstance.interceptors.response.use(
    response => {
      // Do something with response data
      return response;
    },
    async (error) => {
      if (error?.response?.status === 401) {
      } else {
        return Promise.reject(error);
      }
    });

export const ApiNoAuth = axios.create({
        baseURL: process.env.REACT_APP_API_URL
 });

 export const setUser = (token: any, id: any, name: any, email: any, address: any) =>{
     sessionStorage.setItem("sessionId", token);
     sessionStorage.setItem("id", id);
     sessionStorage.setItem("name", name);
     sessionStorage.setItem("userType", "user")
     sessionStorage.setItem("email", email)
     sessionStorage.setItem("address", address)
 }

 export const setAdmin = (token: any, id: any, name: any, email: any, address: any) =>{
    sessionStorage.setItem("sessionId", token);
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("userType", "admin")
    sessionStorage.setItem("email", email)
     sessionStorage.setItem("address", address)
}


export default axiosInstance