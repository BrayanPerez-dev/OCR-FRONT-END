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
) => {
  console.log(result)
  console.log(photo)
  const data = {
    firstname: result.firstName || "no escaneado",
    lastname: result.lastName || "no escaneado",
    datebirth: result.dateOfBirth.originalString || "00/00/0000",
    dateissue: result.dateOfIssue.originalString  || "00/00/0000",
    dateexpiry: result.dateOfExpiry.originalString || "00/00/0000",
    numdocument: result.documentNumber || "no escaneado",
    address: result.address || "no escaneado",
    gender: result.sex || "no escaneado",
    marital_status: result.maritalStatus || "no escaneado",
    proffesion: result.profession || "no escaneado",
    photo: photo || "no escaneado",
    placebirth: result.placeOfBirth || "no escaneado"
  }
  return apiClient.post("document",data).then((res) => {
    console.log("res apiClient",res)
    return res.data;
  }).catch(error => {
    console.log("res apiClient",error)
    return error.response
});

};
