import styled from 'styled-components';
import WebCam from '../components/Webcam/WebCam';
import { useState, useEffect } from 'react';
import base64 from 'base-64';

const ApiScanner = () => {
	const [imageFrontSide, setImageFrontSide] = useState('');
	const [imageBackSide, setImageBackSide] = useState('');

	// eslint-disable-next-line no-undef
	Microblink.SDK.SetRecognizers(['MRTD']);
	// eslint-disable-next-line no-undef
	Microblink.SDK.SetAuthorization(
		'Bearer ' +
			base64.encode(
				'ae811e60137642bb89b4f8e5b4ccb1c2' +
					':' +
					'c5423535-3a23-48b2-918e-e0aebb81d16d'
			)
	);
	/* 
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

	const headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization:
			'Bearer YWU4MTFlNjAxMzc2NDJiYjg5YjRmOGU1YjRjY2IxYzI6YzU0MjM1MzUtM2EyMy00OGIyLTkxOGUtZTBhZWJiODFkMTZk',
	};

	useEffect(() => {
		if (imageFrontSide === '' || imageBackSide === '') {
			return;
		}
		fetch('https://api.microblink.com/v1/recognizers/blinkid-combined', {
			method: 'POST',
			body: JSON.stringify(inputBody),
			headers,
		})
			.then(function (res) {
				return res.json();
			})
			.then(function (body) {
				console.log(body);
			});
	}, [imageBackSide]); */

	const inputBody = {
		returnFullDocumentImage: false,
		returnFaceImage: false,
		returnSignatureImage: false,
		allowBlurFilter: false,
		allowUnparsedMrzResults: false,
		allowUnverifiedMrzResults: true,
		validateResultCharacters: true,
		anonymizationMode: 'FULL_RESULT',
		anonymizeImage: true,
		ageLimit: 0,
		imageSource: imageFrontSide,
	};
	const headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization:
			'Bearer YWU4MTFlNjAxMzc2NDJiYjg5YjRmOGU1YjRjY2IxYzI6YzU0MjM1MzUtM2EyMy00OGIyLTkxOGUtZTBhZWJiODFkMTZk',
	};

	useEffect(() => {
		if (imageFrontSide === '') {
			return;
		}
		fetch('https://api.microblink.com/v1/recognizers/mrtd', {
			method: 'POST',
			body: JSON.stringify(inputBody),
			headers,
		})
			.then(function (res) {
				return res.json();
			})
			.then(function (body) {
				console.log(body);
			});
	}, [imageFrontSide]);

	return (
		<Wrapper>
			<WebCam imgFrontSide={setImageFrontSide} imgBackSide={setImageBackSide} />
		</Wrapper>
	);
};

const Wrapper = styled.div``;

export default ApiScanner;
