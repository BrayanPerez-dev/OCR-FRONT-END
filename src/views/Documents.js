import { useEffect, useState } from 'react';
import { getDocuments } from '../services/Intellityc/document.service';
import styled from 'styled-components';
import { Image, Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Documents = () => {
	const [documents, setDocuments] = useState([]);
	const [loading, setLoading] = useState(true);
	const antIcon = (
		<>
			<h3>Cargando</h3>
			<LoadingOutlined style={{ fontSize: 100 }} spin />
		</>
	);

	useEffect(() => {
		getDocuments(1)
			.then(res => {
				/* 	const results = res.map(row => ({
					key: row.id_document,
					...row,
				})); */
				setDocuments([]);
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => setLoading(false));
	}, []);

	console.log(documents);
	const columns = [
		{
			title: 'Nombres',
			dataIndex: 'first_name',
			key: 'first_name',
			width: 150,
		},
		{
			title: 'Apellidos',
			dataIndex: 'last_name',
			key: 'last_name',
			width: 150,
		},
		{
			title: 'Direccion',
			dataIndex: 'addres',
			key: 'addres',
			width: 150,
		},
		{
			title: 'Fecha de nacimiento',
			dataIndex: 'date_birth',
			key: 'date_birth',
			width: 75,
		},
		{
			title: 'DUI',
			dataIndex: 'num_document',
			key: 'num_document',
			width: 75,
		},
		{
			title: 'Lugar de nacimiento',
			dataIndex: 'place_birth',
			key: 'place_birth',
			width: 150,
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
			render: (_, record) => (
				<Image src={`data:image/png;base64,${record.photo}`} />
			),
			width: 150,
		},
	];
	return (
		<Wrapper>
			<Table
				loading={{ indicator: <Spin indicator={antIcon} />, spinning: loading }}
				columns={columns}
				dataSource={documents}
				scroll={{ x: 1300 }}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.ant-table-wrapper {
		margin-top: 10px;
		padding-left: 6%;
		padding-right: 6%;
	}
`;
export default Documents;
