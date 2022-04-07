import apiClient from './http-common'


const register = (username,email,password) => {
    return apiClient.post("auth/signup", {
      username,
      email,
      password,
    });
}

const login = (email,password) => {
   return apiClient.post("auth/signin", {
     email,
     password,
   })
   .then((response) => {
     if (response.data.token) {
       localStorage.setItem("user", JSON.stringify(response.data));
     }
     return response.data;
   });
}


const logout = () => localStorage.removeItem('user')


const gerCurrentUser = () =>  JSON.parse(localStorage.getItem('user'))

export default { login, register, logout, gerCurrentUser} 