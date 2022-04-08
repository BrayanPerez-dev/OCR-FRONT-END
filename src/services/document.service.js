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
    firstname: result.firstName || "no escaneado",
    lastname: result.lastName || "no escaneado",
    datebirth: dateBirth || "00/00/0000",
    dateissue: dateIssue  || "00/00/0000",
    dateexpiry: dateExpiry || "00/00/0000",
    numdocument: result.documentNumber || "000000000",
    address: result.address || "no escaneado",
    gender: result.sex || "no escaneado",
    marital_status: result.maritalStatus || "no escaneado",
    proffesion: result.profession || "no escaneado",
    photo: photo,
    placebirth: result.placeOfBirth || "no escaneado"
  }
  return apiClient.post("document",data).then((res) => {
    console.log("res apiClient",res)
    return res.data;
  }).catch(error => {
    console.log(error.response)
    return error.response
});

};
