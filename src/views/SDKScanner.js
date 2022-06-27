import { useState, useEffect, useRef } from 'react';
import * as BlinkIDSDK from '@microblink/blinkid-in-browser-sdk';
import Swal from 'sweetalert2';
import { sendDocuments } from '../services/Intellityc/document.service';
import styled from 'styled-components';
import { Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import WaveEffectTwo from '../components/Waves/WaveEffectTwo';
import WaveEffectOne from '../components/Waves/WaveEffectOne';
const SDKScanner = () => {
	const initialMessageEl = useRef('');

	const screenInitial = useRef('');
	const screenStart = useRef('');
	const startScan = useRef('');
	const screenScanning = useRef('');
	const cameraFeed = useRef('');
	const cameraFeedback = useRef('');
	const scanFeedback = useRef('');
	const waves = useRef('');
	const container = useRef('');

	const [drawContext, setDrawContext] = useState();

	const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

	useEffect(() => {
		const drawContext = cameraFeedback.current.getContext('2d');
		setDrawContext(drawContext);
	}, []);
	const main = () => {
		if (!BlinkIDSDK.isBrowserSupported()) {
			initialMessageEl.current.innerText = 'Este navegador no es soportado!';
			return;
		}

		let licenseKey =
			'sRwAAAYJbG9jYWxob3N0r/lOPk4/w35CpJlWLWUUweeP2fIMitv5PphtuZyeiPwKB6jScTcUZQoVF+5DGToUMyMaWe7jdsWpfSmv3YmNyT/arBpdO5OVUSO34/s3/1LMGRk7KOiYme8hMhUJA+/Kwh0EWL0LDP3zVTeNfM0nxAYpivYS2njJRkmjDNZ74Q9dK9EGa3z90gV+JpiFE2uK860Ako668gXdLeP0e5g8iHxBqqHcYCY2hy8naP+7inkqd+aQmNmfk0j6BYlA/ODb5OnT8x+EkiDX9K780uxPgLO5hn6+4ChrC069cFwUTHGIMdEUrQuVs/7xR3yFXC5KIFjLGLo1EJw5nUfyVdj3RjQ=';

		if (
			window.location.hostname === 'intellityc-scanner-client.herokuapp.com'
		) {
			licenseKey =
				'sRwAAAYnaW50ZWxsaXR5Yy1zY2FubmVyLWNsaWVudC5oZXJva3VhcHAuY29tno8VB0kQaLk87+LdN7/hQgCXNgjRBvrPIz9Yl14rk1VrJqW7yUJs0EwJxodko5gz7x9vmgoShixQse0hr6XJRdYY90huqA+rFHy4rZW8eHyDzmZSDbNdp+TbdDUssglTz6Yp2NY48Xg/9WZiq8LsKp85jYCeU/jzpxOQVBds/VBAzd4WlJsroSMf4wJ8Kw+ZJN85p0YQsHoxwt1V/4eQEDuJqrW4KwMo';
		}

		const loadSettings = new BlinkIDSDK.WasmSDKLoadSettings(licenseKey);
		loadSettings.allowHelloMessage = true;
		loadSettings.loadProgressCallback = progress => progress;
		loadSettings.engineLocation = window.location.origin;

		BlinkIDSDK.loadWasmModule(loadSettings).then(
			sdk => {
				screenInitial?.current.classList.add('hidden');
				screenStart?.current.classList.remove('hidden');
				container?.current.classList.remove('hidden');
				container?.current.classList.add('container');

				startScan?.current.addEventListener('click', ev => {
					ev.preventDefault();
					startScaning(sdk);
				});
			},
			error => {
				initialMessageEl.current.innerText = 'no se pudo cargar SKD!';
				console.error('no se pudo cargar SKD!', error);
			}
		);
	};
	const startScaning = async sdk => {
		screenStart?.current.classList.add('hidden');
		waves?.current.classList.add('hidden');
		container?.current.classList.add('hidden');
		screenScanning?.current.classList.remove('hidden');

		const combinedGenericIDRecognizer =
			await BlinkIDSDK.createBlinkIdCombinedRecognizer(sdk);
		const settings = await combinedGenericIDRecognizer.currentSettings();
		settings.returnEncodedFaceImage = true;
		settings.returnEncodedFullDocumentImage = true;
		settings.returnFaceImage = true;
		settings.returnFullDocumentImage = true;
		await combinedGenericIDRecognizer.updateSettings(settings);

		const callbacks = {
			onQuadDetection: quad => drawQuad(quad),
			onDetectionFailed: () => updateScanFeedback('Detencion fallida', true),
			onFirstSideResult: () => Swal.fire('Voltea el documento'),
		};
		const recognizerRunner = await BlinkIDSDK.createRecognizerRunner(
			sdk,
			[combinedGenericIDRecognizer],
			false,
			callbacks
		);

		const videoRecognizer =
			await BlinkIDSDK.VideoRecognizer.createVideoRecognizerFromCameraStream(
				cameraFeed.current,
				recognizerRunner
			);

		const scanTimeoutSeconds = 15;
		try {
			videoRecognizer.startRecognition(async recognitionState => {
				if (!videoRecognizer) {
					Swal.fire({
						icon: 'error',
						title: '',
						text: 'Error de video de reconocimiento!',
					});
					return;
				}
				videoRecognizer.pauseRecognition();
				if (recognitionState === BlinkIDSDK.RecognizerResultState.Empty) {
					Swal.fire({
						icon: 'error',
						title: '',
						text: 'El estado de reconicimiento esta vacio',
					});
					return;
				}
				const result = await combinedGenericIDRecognizer.getResult();
				if (result.state === BlinkIDSDK.RecognizerResultState.Empty) {
					Swal.fire({
						icon: 'error',
						title: '',
						text: 'El estado del resultado esta vacio',
					});
					return;
				}
				console.log('BlinkIDCombined results', result);
				console.log(
					result.fullDocumentFrontImage.encodedImage,
					result.fullDocumentBackImage
				);

				const { faceImage } = result;
				const { encodedImage } = faceImage;

				const encodedImageToBase64 = buffer => {
					let binary = '';
					const bytes = new Uint8Array(buffer);
					const len = bytes.byteLength;
					for (let i = 0; i < len; i++) {
						binary += String.fromCharCode(bytes[i]);
					}
					return window.btoa(binary);
				};
				const photo = encodedImageToBase64(encodedImage.buffer);

				Swal.fire({
					title: 'Datos Capturados',
					showDenyButton: true,
					showCancelButton: true,
					showConfirmButton: true,
					confirmButtonText: 'Guardar',
					denyButtonText: 'No Guardar',
					cancelButtonText: 'Cancelar',
					html: `<img height="150" width:"350" src="data:image/png;base64,${photo}">
                           <br> Nombre: ${result.firstName} 
                           <br> Apellido: ${result.lastName}
                           <br> Fecha de Nacimiento: ${result.dateOfBirth.originalString} 
                           <br> Lugar de Nacimiento: ${result.placeOfBirth} 
                           <br> Fecha de Emisión: ${result.dateOfIssue.originalString}
                           <br> Fecha de Expiracion: ${result.dateOfExpiry.originalString}
                           <br> Numero de Documento: ${result.documentNumber} 
                           <br> Direccion: ${result.address} 
                           <br> Genero: ${result.sex} 
                           <br> Estado Marital: ${result.maritalStatus}
                           <br> Ocupacion: ${result.profession}
                           `,
				}).then(value => {
					if (value.isConfirmed) {
						sendDocuments(result, photo)
							.then(res => {
								console.log('res scanner', res.result);
								if (res.result) {
									Swal.fire('Guardado!', '', 'success');
									window.location.reload();
								}
							})
							.catch(error => {
								console.log('error scanner', error);
								if (error.message) {
									Swal.fire({
										icon: 'error',
										title: '',
										text: 'Hubo un error,intente de nuevo!',
									});
									window.location.reload();
								}
							});
					} else if (value.isDenied) {
						Swal.fire('La informacion no fue guardada', '', 'info');
						window.location.reload();
					}
				});

				videoRecognizer?.releaseVideoFeed();
				recognizerRunner?.delete();
				combinedGenericIDRecognizer?.delete();
				clearDrawCanvas();
				screenStart?.current.classList.remove('hidden');
				screenScanning?.current.classList.add('hidden');
			}, scanTimeoutSeconds * 1000);
		} catch (error) {
			console.error('Error during initialization of VideoRecognizer:', error);
			Swal.fire({
				icon: 'error',
				title: '',
				text: `Error during initialization of VideoRecognizer:${error.message}`,
			});
		}
	};

	const drawQuad = quad => {
		clearDrawCanvas();
		setupColor(quad);
		setupMessage(quad);
		applyTransform(quad.transformMatrix);
		drawContext.beginPath();
		drawContext.moveTo(quad.topLeft.x, quad.topLeft.y);
		drawContext.lineTo(quad.topRight.x, quad.topRight.y);
		drawContext.lineTo(quad.bottomRight.x, quad.bottomRight.y);
		drawContext.lineTo(quad.bottomLeft.x, quad.bottomLeft.y);
		drawContext.closePath();
		drawContext.stroke();
	};
	const applyTransform = transformMatrix => {
		const canvasAR =
			cameraFeedback.current.width / cameraFeedback.current.height;
		const videoAR =
			cameraFeed.current.videoWidth / cameraFeed.current.videoHeight;
		let xOffset = 0;
		let yOffset = 0;
		let scaledVideoHeight = 0;
		let scaledVideoWidth = 0;
		if (canvasAR > videoAR) {
			scaledVideoHeight = cameraFeedback.current.height;
			scaledVideoWidth = videoAR * scaledVideoHeight;
			xOffset = (cameraFeedback.current.width - scaledVideoWidth) / 2.0;
		} else {
			scaledVideoWidth = cameraFeedback.current.width;
			scaledVideoHeight = scaledVideoWidth / videoAR;
			yOffset = (cameraFeedback.current.height - scaledVideoHeight) / 2.0;
		}
		drawContext.translate(xOffset, yOffset);
		drawContext.scale(
			scaledVideoWidth / cameraFeed.current.videoWidth,
			scaledVideoHeight / cameraFeed.current.videoHeight
		);
		drawContext.transform(
			transformMatrix[0],
			transformMatrix[3],
			transformMatrix[1],
			transformMatrix[4],
			transformMatrix[2],
			transformMatrix[5]
		);
	};
	const clearDrawCanvas = () => {
		cameraFeedback.current.width = cameraFeedback.current.clientWidth;
		cameraFeedback.current.height = cameraFeedback.current.clientHeight;
		drawContext.clearRect(
			0,
			0,
			cameraFeedback.current.width,
			cameraFeedback.current.height
		);
	};

	const setupColor = displayable => {
		console.log(displayable);
		let color = '#FFFF00FF';
		if (displayable.detectionStatus === 0) {
			color = '#FF0000FF';
		} else if (displayable.detectionStatus === 1) {
			color = '#00FF00FF';
		}
		drawContext.fillStyle = color;
		drawContext.strokeStyle = color;
		drawContext.lineWidth = 5;
	};
	const setupMessage = displayable => {
		switch (displayable.detectionStatus) {
			case BlinkIDSDK.DetectionStatus.Fail:
				updateScanFeedback('Escaneando...');
				break;
			case BlinkIDSDK.DetectionStatus.Success:
			case BlinkIDSDK.DetectionStatus.FallbackSuccess:
				updateScanFeedback('Detencion exitosa');
				break;
			case BlinkIDSDK.DetectionStatus.CameraAtAngle:
				updateScanFeedback('Ajustar el ángulo');
				break;
			case BlinkIDSDK.DetectionStatus.CameraTooHigh:
				updateScanFeedback('acercar el documento');
				break;
			case BlinkIDSDK.DetectionStatus.CameraTooNear:
			case BlinkIDSDK.DetectionStatus.DocumentTooCloseToEdge:
			case BlinkIDSDK.DetectionStatus.Partial:
				updateScanFeedback('Aleja el documento');
				break;
			default:
				console.warn(
					'¡Estado de detección no controlado!',
					displayable.detectionStatus
				);
		}
	};
	let scanFeedbackLock = false;

	const updateScanFeedback = (message, force) => {
		if (scanFeedbackLock && !force) {
			return;
		}
		scanFeedbackLock = true;
		scanFeedback.current.innerText = message;
		setTimeout(() => (scanFeedbackLock = false), 1000);
	};
	useEffect(() => {
		main();
	}, []);

	return (
		<WrapperScanner>
			<div ref={screenInitial} id='screen-initial'>
				<h3 ref={initialMessageEl} id='msg'>
					Cargando...
				</h3>
				<Spin indicator={antIcon} />
			</div>
			<div ref={screenStart} id='screen-start' className='hidden'>
				<div ref={waves} className='waves'>
					<WaveEffectOne
						height={10}
						firstColor={'#e65159'}
						secondColor={'#e65159'}
					/>
					<WaveEffectTwo height={10} color={'#f9989d'} />

					<Button ref={startScan} id='start-scan'>
						INICIAR ESCANEO
					</Button>
				</div>
			</div>
			<div ref={container} className='hidden'></div>
			<div ref={screenScanning} id='screen-scanning' className='hidden'>
				<video ref={cameraFeed} id='camera-feed' playsInline></video>
				<canvas ref={cameraFeedback} id='camera-feedback'></canvas>
				<p ref={scanFeedback} id='camera-guides'>
					Apunte la cámara hacia la parte frontal del documento.
				</p>
			</div>
		</WrapperScanner>
	);
};

const WrapperScanner = styled.div`
	* {
		box-sizing: border-box;
	}

	html,
	body {
		width: 100%;
		height: 100%;
	}

	html {
		margin: 0;
		padding: 0;
		font-size: 16px;
		line-height: 24px;
		font-family: sans-serif;
	}

	body {
		display: flex;
		min-height: 100%;
		margin: 0;
		padding: 1.5rem;
		justify-content: center;
		align-items: center;
	}

	#screen-scanning {
		display: block;
		width: 100%;
		height: 100%;
	}

	#screen-start {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.waves {
		display: flex;
		flex-direction: column-reverse;
		width: 100vw;
	}
	.container {
		z-index: -1;
		position: fixed;
		bottom: 0;
		min-width: 100%;
		height: 50vh;
		background: linear-gradient(to top, #7f050d, #e65159 70%);
	}
	#screen-initial {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	/* Rules for better readability */
	img {
		display: block;
		width: 100%;
		max-width: 320px;
		height: auto;
	}

	video {
		width: 100%;
		height: 100%;
	}

	textarea {
		display: block;
	}

	/* Camera feedback */
	#screen-scanning {
		position: relative;
	}

	#camera-feedback {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		width: 100%;
		height: 100%;
	}

	#camera-guides {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		text-align: center;
		font-weight: bold;
	}

	/* Auxiliary classes */
	.hidden {
		display: none !important;
	}

	#start-scan {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 6px;
		font-size: 18px;
		color: white;
		cursor: pointer;
		user-select: none;
		text-align: center;
		text-decoration: none;
		width: 200px;
		height: 40px;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		border: 1px solid #fff;
	}

	#start-scan span {
		color: #707070;
		font-weight: 600;
	}

	#start-scan:hover {
		//  background-color: #3a3a3a;
		border: 1px solid #fff;
	}
`;
export default SDKScanner;
