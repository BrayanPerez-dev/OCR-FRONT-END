import styled from 'styled-components';
import WebCam from '../components/Webcam/WebCam';
import { useState, useEffect } from 'react';
import { sendImagesToApiCloudCombined } from '../services/Blinkid/blinkid.service';
import BrowserCam from '../components/Webcam/BrowserCam';
import { Outlet, Link } from 'react-router-dom';
import { Divider } from 'antd';

const ApiScanner = () => {
	const [imageFrontSide, setImageFrontSide] = useState('');
	const [imageBackSide, setImageBackSide] = useState('');

	useEffect(() => {
		if (imageFrontSide === '' || imageBackSide === '') {
			return;
		}

		const getData = () => {
			const inputBody = {
				returnFullDocumentImage: false,
				returnFaceImage: false,
				returnSignatureImage: false,
				allowBlurFilter: false,
				allowUnparsedMrzResults: false,
				allowUnverifiedMrzResults: true,
				skipUnsupportedBack: false,
				validateResultCharacters: true,
				anonymizationMode: 'FULL_RESULT',
				anonymizeImage: true,
				imageFrontSide,
				imageBackSide,
				ageLimit: 0,
				scanCroppedDocumentImage: false,
				maxAllowedMismatchesPerField: 0,
				allowUncertainFrontSideScan: true,
			};
			const data = JSON.stringify(inputBody);
			return sendImagesToApiCloudCombined(data)
				.then(body => {
					console.log('result', body);
				})
				.catch(error => {
					console.log(error);
				})
				.finally();
		};
		getData();
	}, [imageBackSide]);

	return (
		<Wrapper>
			<Links>
				<Link to='browsercam'>
					<h4>Browser Cam</h4>
				</Link>
				<Link to='webcam'>
					<h4>Web Cam</h4>
				</Link>
			</Links>
			<Outlet />
		</Wrapper>
	);
};
const Wrapper = styled.div``;

const Links = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
`;

export default ApiScanner;
