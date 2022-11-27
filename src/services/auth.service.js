import API from './api';

//const API_URL = "http://localhost:8081/api/auth/";

class AuthService {
  login(username, password) {
    return API
      //.post("signin", {
      .post("auth/signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, name, email, password) {
    //return API.post("signup", {
    return API.post("auth/signup", {
      username,
      name,
      email,
      password
    });
  }

  forgotpassword(username, email) {
    return API.post("auth/forgotpassword", {
      username,
      email,
    });
  }

  resetpassword(token, password) {
    return API.post("auth/resetpassword", {
      token,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
