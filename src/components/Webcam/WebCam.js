import { Button } from 'antd';
import Webcam from 'react-webcam';
import { useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const WebCam = ({ imgFrontSide, imgBackSide }) => {
	const [imageFrontSide, setImageFrontSide] = useState('');
	const [imageBackSide, setImageBackSide] = useState('');
	const [flag, setFlag] = useState(false);

	const videoConstraints = {
		width: 600,
		height: 400,
		fancingMode: { exact: 'environment' },
	};
	const capture = getScreenshot => {
		const base64 = getScreenshot.slice(22).toString();
		if (imageFrontSide === '') {
			setFlag(false);
			imgFrontSide(base64);
			return setImageFrontSide(getScreenshot);
		}
		if (imageBackSide === '') {
			imgBackSide(base64);
			return setImageBackSide(getScreenshot);
		}
		setFlag(true);
	};

	const clearImages = () => {
		setImageFrontSide('');
		setImageBackSide('');
	};

	return (
		<Wrapper>
			<br />
			{flag && <h3>Limpia Las Imagenes,Para Volver A Capturar </h3>}
			<Webcam
				videoConstraints={videoConstraints}
				audio={false}
				height={400}
				width={600}
				screenshotFormat='image/png'
				className='webcam'
			>
				{({ getScreenshot }) => (
					<>
						<br />
						<Button
							onClick={() => {
								capture(getScreenshot());
							}}
						>
							Capturar Documento
						</Button>
						<br />
						<Button
							onClick={() => {
								clearImages();
							}}
						>
							Limpiar Documento
						</Button>
						<br />
					</>
				)}
			</Webcam>
			{imageFrontSide && <img src={imageFrontSide} />}
			<br />
			{imageBackSide && <img src={imageBackSide} />}
			<br />
		</Wrapper>
	);
};

if (process.env.NODE_ENV !== 'production') {
	WebCam.propTypes = {
		imgFrontSide: propTypes.func,
		imgBackSide: propTypes.func,
	};
}
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	.webcam {
		margin: 0px 0px 0px 0px;
	}
	img {
		margin: 0px 0px 0px 0px;
	}
`;
export default WebCam;
