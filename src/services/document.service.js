import apiClient from './http-common'
import { authHeader } from "./auth.header";

export const getDocuments = () => {
  //return apiClient.get("document", { headers: authHeader() });
  return apiClient.get("document").then((response)=> {
            return response.data
  });
};

export const sendDocuments = async (
  result,
  photo,
  dateBirth,
  dateIssue,
  dateExpiry
) => {
  const data = {
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
  };
  console.log(document);
  apiClient.post("document", data).then(res => {
    return res.data;
  })
};
