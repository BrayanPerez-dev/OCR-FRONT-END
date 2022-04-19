import { Table } from 'antd'
import React from 'react'
import { useEffect,useState } from 'react'
import { getDocuments } from '../services/document.service'
import styled from "styled-components"
import { Image,Spin } from 'antd' 
import { LoadingOutlined } from '@ant-design/icons';

const Documents = () => {
   
  const [documents,setDocuments] = useState([])
  const [loading,setLoading] = useState(true)
  const antIcon = <><h1>Cargando</h1><LoadingOutlined style={{ fontSize: 120 }} spin /></>;

  useEffect(() => {
    getDocuments().then(res => {
      console.log(res)
      const results = res.map(row => ({
        key:row.id_document,
        ...row
      }))
      console.log(results)
      setDocuments(results)
    }).catch((error)=>{
      console.log(error)
    }).finally(() => setLoading(false))
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
    <Table loading={{indicator:  <Spin indicator={antIcon} />, spinning: loading}} columns={columns} dataSource={documents}/>
    </Wrapper>
  )
}

const Wrapper = styled.div `

`
export default Documents