import axios from 'axios';
import authHeader from './auth.header'
const API_URL = 'https://intellityc-scanner-server.herokuapp.com/api/documents'

export const getDocuments = () => {
    return axios.get(API_URL,{
        headers:{authHeader}
    })
}

export const sendDocuments = () => {
    return axios.get(API_URL,{
        headers:{authHeader}
    })
}