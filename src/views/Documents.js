import { Table } from 'antd'
import React from 'react'
import { useEffect,useState } from 'react'
import { getDocuments } from '../services/document.service'
import styled from "styled-components"
import { Image } from 'antd' 
const Documents = () => {
   
  const [documents,setDocuments] = useState([])
  
  useEffect(() => {
    getDocuments().then(res => {
      console.log(res)
      setDocuments(res)
    },(error)=>{
      console.log(error)
    })
  }, [])
  console.log(documents)
  const columns = [
    {
      title: 'Nombres',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Apellidos',
      dataIndex: 'last_name',
      key: 'last_name',
    }, 
    {
      title: 'Direccion',
      dataIndex: 'addres',
      key: 'addres',
    }, 
    {
      title: 'Fecha de nacimiento',
      dataIndex: 'date_birth',
      key: 'date_birth',
    }, 
    {
      title: 'DUI',
      dataIndex: 'num_document',
      key: 'num_document',
    }, 
    {
      title: 'Lugar de nacimiento',
      dataIndex: 'place_birth',
      key: 'place_birth',
    },
     {
      title: 'Profesion',
      dataIndex: 'proffesion',
      key: 'proffesion',
    },
    {
      title: 'Estatus marital',
      dataIndex: 'marital_status',
      key: 'marital_status',
    },
    {
      title: 'Genero',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Fecha de creacion',
      dataIndex: 'date_issue',
      key: 'date_issue',
    },
    {
      title: 'Fecha de expiracion',
      dataIndex: 'date_expiry',
      key: 'date_expiry',
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (_,record) =>( <Image src={`data:image/png;base64,${record.photo}`}/>),
    },
  ]
  return (
    <Wrapper>
    <Table rowKey={record => record.id} columns={columns} dataSource={documents}/>
    </Wrapper>
  )
}

const Wrapper = styled.div `

`
export default Documents