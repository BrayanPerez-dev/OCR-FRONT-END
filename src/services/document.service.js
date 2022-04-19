import apiClient from './http-common'
import { authHeader } from "./auth.header";

export const getDocuments = () => {
  //return apiClient.get("document", { headers: authHeader() });
  return apiClient.get("document").then((response)=> {
             console.log(response)
            return response.data
  })
};

export const sendDocuments = async (
  result,
  photo,
) => {
  console.log(result)
  console.log(photo)
  const data = {
    firstname: result.firstName,
    lastname: result.lastName,
    datebirth: result.dateOfBirth.originalString,
    dateissue: result.dateOfIssue.originalString,
    dateexpiry: result.dateOfExpiry.originalString,
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
  })

};
