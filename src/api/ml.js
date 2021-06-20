import axios from 'axios';

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
// const BASE_URL = `http://127.0.0.1:${process.env.REACT_APP_PORT}/api/v1`;
const BASE_URL = `${process.env.REACT_APP_ATHERAS_SERVER_URL}/api/v1`;

const apiML = {
    /** @param {string} resource */
    getMLPreview: (token) => {
        return axios.get(`${BASE_URL}/ml/preview/1/`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(response => {
            return response.data.data
        }).catch(error => {
            return error;
        })
    }
}

export default apiML;