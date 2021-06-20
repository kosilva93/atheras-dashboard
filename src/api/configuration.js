import axios from 'axios';

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
// const BASE_URL = `http://127.0.0.1:${process.env.REACT_APP_PORT}/api/v1`;
const BASE_URL = `${process.env.REACT_APP_ATHERAS_SERVER_URL}/api/v1`;


const apiConfig = {
    /** @param {string} resource */
    getAllConfiguration: (token) => {
        return axios.get(`${BASE_URL}/configuration/`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(response => {
            return response.data.data
        }).catch(error => {
            return Promise.reject(error.response.data);
        })
    },
    getConfiguration: (token, id) => {
        return axios.get(`${BASE_URL}/configuration/${id}/`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(response => {
            return response.data.data
        }).catch(error => {
            return Promise.reject(error.response.data);
        })
    },
    addConfiguration: (token, body) => {
        return axios.post(`${BASE_URL}/configuration/`, body, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(response => {
            return response.data.data
        }).catch(error => {
            return Promise.reject(error.response.data);
        })
    },
    updateConfiguration: (token, id, body) => {
        return axios.patch(`${BASE_URL}/configuration/${id}/`, body, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(response => {
            return response.data.data
        }).catch(error => {
            return Promise.reject(error.response.data);
        })
    },
    deleteConfiguration: (token, id) => {
        return axios.delete(`${BASE_URL}/configuration/${id}/`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(response => {
            return response.data.data
        }).catch(error => {
            return Promise.reject(error.response.data);
        })
    }
}

export default apiConfig;
