import axios from 'axios'

const API_URL = "https://intellityc-scanner-server.herokuapp.com/api/auth/"


const register = (username,email,password) => {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
}

const login = (email,password) => {
   console.log(email,password)
   return axios.post(API_URL + "signin", {
     email,
     password,
   })
   .then((response) => {
      console.log(response.data)
     if (response.data.token) {
       localStorage.setItem("user", JSON.stringify(response.data));
     }
     return response.data;
   });
}


const logout = () => localStorage.removeItem('user')


const gerCurrentUser = () =>  JSON.parse(localStorage.getItem('user'))

export default { login, register, logout, gerCurrentUser} 