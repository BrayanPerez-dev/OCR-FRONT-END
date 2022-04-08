import apiClient from './http-common'
import { authHeader } from "./auth.header";

export const getDocuments = () => {
  //return apiClient.get("document", { headers: authHeader() });
  return apiClient.get("document").then((response)=> {
            return response.data
  }).catch(error => {
    console.log(error.response)
});
};

export const sendDocuments = async (
  result,
  photo,
  dateBirth,
  dateIssue,
  dateExpiry
) => {
  console.log(result)
  console.log(photo)
  console.log(dateBirth)
  console.log(dateIssue)
  console.log(dateExpiry)
  console.log(result.documentNumber)
  const data = {
    firstname: result.firstName,
    lastname: result.lastName,
    datebirth: dateBirth,
    dateissue: dateIssue,
    dateexpiry: dateExpiry,
    numdocument: result.documentNumber,
    address: result.address,
    gender: result.sex,
    marital_status: result.maritalStatus,
    proffesion: result.profession,
    photo: photo,
    placebirth: result.placeOfBirth
  }
  return apiClient.post("document",data).then((res) => {
    console.log("res apiClient",res)
    return res.data;
  }).catch(error => {
    console.log(error.response)
    return error.response
});

};
