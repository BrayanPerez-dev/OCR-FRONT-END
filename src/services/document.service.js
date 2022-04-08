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
  console.log(result)
  console.log(dateBirth,typeof dateBirth,Number(dateBirth))
  console.log(dateIssue,typeof dateIssue,Number(dateIssue))
  console.log(dateExpiry, typeof dateExpiry,Number(dateExpiry))
  console.log(typeof result.documentNumber,Number(result.documentNumber))

  apiClient.post("document",{
  firstname: result.firstName,
  lastname: result.lastName,
  datebirth: dateBirth,
  dateissue: dateIssue,
  dateexpiry: dateExpiry,
  numdocument: Number(result.documentNumber),
  addres: result.address,
  gender: result.sex,
  marital_status: result.maritalStatus,
  proffesion: result.profession,
  photo: photo,
  placebirth: result.placeOfBirth
}).then((res) => {
    console.log("res apiClient",res)
    return res.data;
  })

};
