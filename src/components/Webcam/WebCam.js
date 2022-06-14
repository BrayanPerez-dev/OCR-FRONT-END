import { Button } from 'antd';
import Webcam from 'react-webcam';
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import { Rnd } from 'react-rnd';

const WebCam = ({ imgFrontSide, imgBackSide }) => {
	const FACING_MODE_USER = 'user';
	const FACING_MODE_ENVIRONMENT = 'environment';

	const [imageFrontSide, setImageFrontSide] = useState('');
	const [imageBackSide, setImageBackSide] = useState('');
	const [flag, setFlag] = useState(false);
	const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

	const videoConstraints = {
		width: 600,
		height: 400,
		fancingMode: FACING_MODE_USER,
	};
	const handleClick = useCallback(() => {
		setFacingMode(prevState =>
			prevState === FACING_MODE_USER
				? FACING_MODE_ENVIRONMENT
				: FACING_MODE_USER
		);
	}, []);
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
			<Rnd style={{ ReDr }} default={{ x: 90, y: 90, width: 360, height: 240 }}>
				<Webcam
					videoConstraints={{ ...videoConstraints, facingMode }}
					audio={false}
					height={400}
					width={360}
					screenshotFormat='image/png'
					className='webcam'
				>
					{({ getScreenshot }) => (
						<div className='buttons'>
							<br />
							<Button onClick={handleClick}>Cambiar Camara</Button>
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
						</div>
					)}
				</Webcam>

				{imageFrontSide && <img src={imageFrontSide} />}
				<br />
				{imageBackSide && <img src={imageBackSide} />}
				<br />
			</Rnd>
		</Wrapper>
	);
};

if (process.env.NODE_ENV !== 'production') {
	WebCam.propTypes = {
		imgFrontSide: propTypes.func,
		imgBackSide: propTypes.func,
	};
}

const ReDr = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 'solid 1px #ddd';
	background: #f0f0f0;
`;

const Wrapper = styled.div`
	display: flex !important;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center !;
	align-items: center;
	.webcam {
		margin: 0px 0px 0px 0px;
	}
	img {
		margin: 0px 0px 0px 0px;
	}
	.buttons {
		display: flex;
		align-content: center;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		flex-direction: column;
	}
`;
export default WebCam;
