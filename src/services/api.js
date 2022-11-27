import axios from 'axios';
import EventBus from "../common/EventBus";
import AuthService from "./auth.service";

const instance =  axios.create({
  baseURL: 'http://localhost:8081/api/'
  //baseURL: 'https://bolaodacopa.tk/api/'
});


instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const user = AuthService.getCurrentUser();
  if ((401 === error.response.status) && (user)) {
      // handle error: inform user, go to login, etc
      EventBus.dispatch("logout");      
      return window.location.href = '/login';      
  } else {
      return Promise.reject(error);
  }
});

export default instance;