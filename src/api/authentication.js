import axios from 'axios';

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
// const BASE_URL = `http://127.0.0.1:${process.env.REACT_APP_PORT}/api/v1`;
const BASE_URL = `${process.env.REACT_APP_ATHERAS_SERVER_URL}/api/v1`;

const apiAuth = {
  /** @param {string} resource */
  login: (body) => {
    // API call to authenticate the user
    return axios
      .post(`${BASE_URL}/authentication/login/`, body)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        throw error.response.data;
      });
  },

  register: (body) => {
    // API call to register the user
    return axios
      .post(`${BASE_URL}/authentication/register/`, body)
      .then((response) => {
        console.log("response: ", response.data);
        return response.data;
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        throw error.response.data;
      });
  },

  forgotPassword: (body) => {
    // API call to change password
    return axios
      .post(`${BASE_URL}/authentication/ui/password-reset-email/`, body)
      .then((response) => {
        console.log("response: ", response.data);
        return response.data;
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        throw error.response.data;
      });
  },

  resetPassword: (body) => {
    console.log("body: ", body);
    // API call to reset password
    return axios
      .patch(`${BASE_URL}/authentication/ui/password-reset-complete/`, body)
      .then((response) => {
        console.log("response: ", response.data);
        return response.data;
      })
      .catch((error) => {
        console.log("error: ", error.response.data);
        throw error.response.data;
      });
  },

  refreshToken: () => {
    console.log("Token refresh Complete");
  },
};

export default apiAuth;
