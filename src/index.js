/* eslint-disable linebreak-style */
/* eslint-disable no-sequences */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import * as BlinkIDSDK from '@microblink/blinkid-in-browser-sdk';
import Swal from 'sweetalert2';
import './style.css';

const initialMessageEl = document.getElementById('msg');
const progressEl = document.getElementById('load-progress');
const cameraFeed = document.getElementById('camera-feed');
const cameraFeedback = document.getElementById('camera-feedback');
const drawContext = cameraFeedback.getContext('2d');
const scanFeedback = document.getElementById('camera-guides');
const screenStart = document.getElementById('screen-start');
const screenScanning = document.getElementById('screen-scanning');
const screenInitial = document.getElementById('screen-initial');
const startScan = document.getElementById('start-scan');
const main = () => {
  if (!BlinkIDSDK.isBrowserSupported()) {
    initialMessageEl.innerText = 'Este navegador no es soportado!';
    return;
  }
  let licenseKey = 'sRwAAAYJbG9jYWxob3N0r/lOPk4/w35CpJlWLc09Zs/mjuGYKJq7GjtRvUpB50NLGDbNQfrme34VlyR9wNs/P4L6GtUVgiQ1Rahc34/rXvsi/ca+hsgPa6udsMam5GcIQBblkWcamv/qu2cYWmM8Tm9Uk2PwHy7Jw1jBRoK5tfvZgo7AiNWUmvJoR2JgkyCSH3ZZOZcGiOdOk5O86+LDIRCoLo//ARugB9Wh/3ym5JPQvYCyzyGpkJtlA4HTnRduma2oAT7Qw/XLjVX7t5Js7MeX59oY0pKA9EQUPIKFWYLcQKeKmTVdj1QVf17DBFJgHY3N587WALhyznh5CJTNMeSTgUikTAGvT48SSDonVqFc';

  if (window.location.hostname === 'technosal-prototipo.herokuapp.com') licenseKey = 'sRwAAAYhdGVjaG5vc2FsLXByb3RvdGlwby5oZXJva3VhcHAuY29t0NzeS8194PqCX21GrqYFvcg2p9O9RdJEA71jthEXJsAHwQrA0VmowzwKlQTixeBnorEu2xEIppEmNcDQU6vscZ4M8QGJYaDghTxXiKSIhBHr9dmI2OhCcMRMY1lvBaXRVOlJWjf0Z28M9Z1o5C67sLiCe/1Ynvh6NbYALLaRPH6+v/TWSWDkClwhZdFspRhQ77+MJwyfrU9Eovvj8fqpnmO1TjomsAvk5wk=';

  const loadSettings = new BlinkIDSDK.WasmSDKLoadSettings(licenseKey);

  loadSettings.allowHelloMessage = true;
  loadSettings.loadProgressCallback = (progress) => (progressEl.value = progress);
  loadSettings.engineLocation = window.location.origin;
  BlinkIDSDK.loadWasmModule(loadSettings).then(
    (sdk) => {
      screenInitial?.classList.add('hidden');
      screenStart?.classList.remove('hidden');
      startScan?.addEventListener('click', (ev) => {
        ev.preventDefault();
        startScaning(sdk);
      });
    },
    (error) => {
      initialMessageEl.innerText = 'no se pudo cargar SKD!';
      console.error('no se pudo cargar SKD!', error);
    },
  );
};

const startScaning = async (sdk) => {
  screenStart?.classList.add('hidden');
  screenScanning?.classList.remove('hidden');

  const combinedGenericIDRecognizer = await BlinkIDSDK.createBlinkIdCombinedRecognizer(
    sdk,
  );
  const settings = await combinedGenericIDRecognizer.currentSettings();
  settings.allowSignature = true;
  settings.returnEncodedFaceImage = true;
  settings.returnEncodedFullDocumentImage = true;
  settings.returnEncodedSignatureImage = true;
  settings.returnFaceImage = true;
  settings.returnFullDocumentImage = true;
  settings.returnSignatureImage = true;
  await combinedGenericIDRecognizer.updateSettings(settings);
  const callbacks = {
    onQuadDetection: (quad) => drawQuad(quad),
    onDetectionFailed: () => updateScanFeedback('Detencion fallida', true),
    onFirstSideResult: () => Swal.fire('Voltea el documento'),
  };
  const recognizerRunner = await BlinkIDSDK.createRecognizerRunner(
    sdk,
    [combinedGenericIDRecognizer],
    false,
    callbacks,
  );

  const videoRecognizer = await BlinkIDSDK.VideoRecognizer.createVideoRecognizerFromCameraStream(
    cameraFeed,
    recognizerRunner,
  );

  const scanTimeoutSeconds = 15;
  try {
    videoRecognizer.startRecognition(async (recognitionState) => {
      if (!videoRecognizer) {
        Swal.fire({ icon: 'error', title: '', text: 'Error de video de reconocimiento!' });
        return;
      }
      videoRecognizer.pauseRecognition();
      if (recognitionState === BlinkIDSDK.RecognizerResultState.Empty) {
        Swal.fire({ icon: 'error', title: '', text: 'El estado de reconicimiento esta vacio' });
        return;
      }
      const result = await combinedGenericIDRecognizer.getResult();
      if (result.state === BlinkIDSDK.RecognizerResultState.Empty) {
        Swal.fire({ icon: 'error', title: '', text: 'El estado del resultado esta vacio' });
        return;
      }
      console.log('BlinkIDCombined results', result);
      const { faceImage } = result;
      const { encodedImage } = faceImage;
      const encodedImageToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      };

      Swal.fire({
        title: 'DUI',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: 'No Guardar',
        cancelButtonText: 'Cancelar',
        html: `<img height="150" width:"200" src="data:image/png;base64,${encodedImageToBase64(encodedImage.buffer)}">
                           <br> Nombre: ${result.firstName} 
                           <br> Apellido: ${result.lastName}
                           <br> Fecha de Nacimiento: ${result.dateOfBirth.year}-${result.dateOfBirth.month}-${result.dateOfBirth.day} 
                           <br> Lugar de Nacimiento: ${result.placeOfBirth} 
                           <br> Fecha de Emisión: ${result.dateOfIssue.day}-${result.dateOfIssue.month}-${result.dateOfIssue.year}
                           <br> Fecha de Expiracion: ${result.dateOfExpiry.day}-${result.dateOfExpiry.month}-${result.dateOfExpiry.year}
                           <br> Numero de Documento: ${result.documentNumber} 
                           <br> Direccion: ${result.address} 
                           <br> Nacionalidad: ${result.nationality && 'SALVADOREÑA'} 
                           <br> Genero: ${result.sex} 
                           <br> Estado Marital: ${result.maritalStatus}
                           <br> Ocupacion: ${result.profession}
                           `,
      }).then((value) => {
        if (value.isConfirmed) Swal.fire('Guardado!', '', 'success');
        else if (value.isDenied) Swal.fire('La informacion no fue guardada', '', 'info');
      });
      videoRecognizer?.releaseVideoFeed();
      recognizerRunner?.delete();
      combinedGenericIDRecognizer?.delete();
      clearDrawCanvas();
      screenStart
        ?.classList.remove('hidden');
      screenScanning
        ?.classList.add('hidden');
    }, scanTimeoutSeconds * 1000);
  } catch (error) {
    console.error('Error during initialization of VideoRecognizer:', error);
    Swal.fire({ icon: 'error', title: '', text: `Error during initialization of VideoRecognizer:${error.message}` });
  }
};
const drawQuad = (quad) => {
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
const applyTransform = (transformMatrix) => {
  const canvasAR = cameraFeedback.width / cameraFeedback.height;
  const videoAR = cameraFeed.videoWidth / cameraFeed.videoHeight;
  let xOffset = 0;
  let yOffset = 0;
  let scaledVideoHeight = 0;
  let scaledVideoWidth = 0;
  if (canvasAR > videoAR) {
    scaledVideoHeight = cameraFeedback.height;
    scaledVideoWidth = videoAR * scaledVideoHeight;
    xOffset = (cameraFeedback.width - scaledVideoWidth) / 2.0;
  } else {
    scaledVideoWidth = cameraFeedback.width;
    scaledVideoHeight = scaledVideoWidth / videoAR;
    yOffset = (cameraFeedback.height - scaledVideoHeight) / 2.0;
  }
  drawContext.translate(xOffset, yOffset);
  drawContext.scale(
    scaledVideoWidth / cameraFeed.videoWidth,
    scaledVideoHeight / cameraFeed.videoHeight,
  );
  drawContext.transform(
    transformMatrix[0],
    transformMatrix[3],
    transformMatrix[1],
    transformMatrix[4],
    transformMatrix[2],
    transformMatrix[5],
  );
};
const clearDrawCanvas = () => {
  cameraFeedback.width = cameraFeedback.clientWidth;
  cameraFeedback.height = cameraFeedback.clientHeight;
  drawContext.clearRect(0, 0, cameraFeedback.width, cameraFeedback.height);
};
const setupColor = (displayable) => {
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
const setupMessage = (displayable) => {
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
        displayable.detectionStatus,
      );
  }
};
let scanFeedbackLock = false;

const updateScanFeedback = (message, force) => {
  if (scanFeedbackLock && !force) {
    return;
  }
  scanFeedbackLock = true;
  scanFeedback.innerText = message;
  window.setTimeout(() => (scanFeedbackLock = false), 1000);
};
main();
