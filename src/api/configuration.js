import axios from 'axios';
import { getToken } from './utils'
//import { handleResponse, handleError } from './response';

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = `http://127.0.0.1:${process.env.REACT_APP_PORT}/api/v1`;
const config = {
    headers: { Authorization: `Bearer ${getToken()}` }
  }

const apiConfig = {
    /** @param {string} resource */
    getAllConfiguration: () => {
        return axios.get(`${BASE_URL}/configuration/`, config).then(response => {
            return response.data.data
        }).catch(error => {
            return Promise.reject(error.response.data);
        })
    },
    getConfiguration: (id) => {
        return axios.get(`${BASE_URL}/configuration/${id}/`, config).then(response => {
            return response.data.data
        }).catch(error => {
            return Promise.reject(error.response.data);
        })
    },
    addConfiguration: (body) => {
        return axios.post(`${BASE_URL}/configuration/`, body, config).then(response => {
            return response.data.data
        }).catch(error => {
            return Promise.reject(error.response.data);
        })
    },
    updateConfiguration: (id, body) => {
        return axios.patch(`${BASE_URL}/configuration/${id}/`, body, config).then(response => {
            return response.data.data
        }).catch(error => {
            return Promise.reject(error.response.data);
        })
    },
    deleteConfiguration: (id) => {
        return axios.delete(`${BASE_URL}/configuration/${id}/`, config).then(response => {
            return response.data.data
        }).catch(error => {
            return Promise.reject(error.response.data);
        })
    }
}

export default apiConfig;