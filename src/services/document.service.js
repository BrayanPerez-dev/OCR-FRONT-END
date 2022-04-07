import axios from 'axios';
import {authHeader} from './auth.header'
const API_URL = 'https://intellityc-scanner-server.herokuapp.com/api/document'

export const getDocuments = () => {
return axios.get(API_URL,{/*headers:{authHeader}*/})
}

export const sendDocuments = (result,photo,dateBirth,dateIssue,dateExpiry) => {
    console.log(document)
    return axios.post(API_URL,{
       //headers:{authHeader}
         body:{
            firstname: result.firstName,
            lastname: result.lastName,
            datebirth: dateBirth,
            dateissue: dateIssue,
            dateexpiry: dateExpiry,
            numdocument: result.documentNumber,
            addres: result.address,
            gender: result.sex,
            marital_status: result.maritalStatus,
            proffesion: result.profession,
            photo: photo,
            placebirth: result.placeOfBirth,
         }
    }).then(res => {
        return res.data
    })
}