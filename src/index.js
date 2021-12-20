import * as BlinkIDSDK from "@microblink/blinkid-in-browser-sdk";
import Swal from 'sweetalert2'
import "./style.css"

const initialMessageEl = document.getElementById("msg");
const progressEl = document.getElementById("load-progress");
const cameraFeed = document.getElementById("camera-feed");
const cameraFeedback = document.getElementById("camera-feedback");
const drawContext = cameraFeedback.getContext("2d");
const scanFeedback = document.getElementById("camera-guides");
const main = () => {
    if (!BlinkIDSDK.isBrowserSupported()) {
        initialMessageEl.innerText = "Este navegador no es soportado!";
        return;
    }
    let licenseKey = "sRwAAAYJbG9jYWxob3N0r/lOPgo/w35CpJmmLl0/ZtejnQ3iqJwwEiE2MsSVGiXRGL3R2hMDNZ72MwPzXh8CE3afYoct+rLb1FmhDLcT9BigmSWUfLs5LoYjcSntAAzXdcJMcyMZtIPs8BTcN4JymLbm9OJ6dHcBMSEcmjV64y5+oAWfbpXGRY9Df90JJWYjs7Tzw0kFlfa3YpJ8hpIGH+RbBmRlUKVrwpgoF4/zQgU2NQu8ueCOlws="

    console.log(window.location.hostname)
    if (window.location.hostname === 'technosal-prototipo.herokuapp.com') licenseKey = "sRwAAAYhdGVjaG5vc2FsLXByb3RvdGlwby5oZXJva3VhcHAuY29t0NzeS8194PqCX21GrqYFvcg2p9O9RdJEA71jthEXJsAHwQrA0VmowzwKlQTixeBnorEu2xEIppEmNcDQU6vscZ4M8QGJYaDghTxXiKSIhBHr9dmI2OhCcMRMY1lvBaXRVOlJWjf0Z28M9Z1o5C67sLiCe/1Ynvh6NbYALLaRPH6+v/TWSWDkClwhZdFspRhQ77+MJwyfrU9Eovvj8fqpnmO1TjomsAvk5wk="


    const loadSettings = new BlinkIDSDK.WasmSDKLoadSettings(licenseKey);

    loadSettings.allowHelloMessage = true;
    loadSettings.loadProgressCallback = (progress) =>
        (progressEl.value = progress);
    loadSettings.engineLocation = window.location.origin;
    console.log(window.location.origin)
    BlinkIDSDK.loadWasmModule(loadSettings).then(
        (sdk) => {
            document.getElementById("screen-initial")?.classList.add("hidden");
            document.getElementById("screen-start")?.classList.remove("hidden");
            document
                .getElementById("start-scan")
                ?.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    startScan(sdk);
                });
        },
        (error) => {
            initialMessageEl.innerText = "no se pudo cargar SKD!";
            console.error("no se pudo cargar SKD!", error);
        }
    );
}

const startScan = async (sdk) => {
    document.getElementById("screen-start")?.classList.add("hidden");
    document.getElementById("screen-scanning")?.classList.remove("hidden");
    const combinedGenericIDRecognizer = await BlinkIDSDK.createBlinkIdCombinedRecognizer(
        sdk
    );
    const callbacks = {
        onQuadDetection: (quad) => drawQuad(quad),
        onDetectionFailed: () => updateScanFeedback("Detencion fallida", true),
        onFirstSideResult: () => Swal.fire('Voltea el documento'),
    };
    const recognizerRunner = await BlinkIDSDK.createRecognizerRunner(
        sdk,
        [combinedGenericIDRecognizer],
        false,
        callbacks
    );

    const videoRecognizer = await BlinkIDSDK.VideoRecognizer.createVideoRecognizerFromCameraStream(
        cameraFeed,
        recognizerRunner
    );

    const scanTimeoutSeconds = 15;
    try {
        videoRecognizer.startRecognition(
            async (recognitionState) => {
                if (!videoRecognizer){ 
                Swal.fire({ icon: 'error', title: '', text: 'Error de video de reconocimiento!'});
                return;
                }
                videoRecognizer.pauseRecognition();
                if (recognitionState === BlinkIDSDK.RecognizerResultState.Empty){ 
                Swal.fire({ icon: 'error', title: '', text: 'El estado de reconicimiento esta vacio' });
                return;
                }
                const result = await combinedGenericIDRecognizer.getResult();
                if (result.state === BlinkIDSDK.RecognizerResultState.Empty){
                Swal.fire({ icon: 'error', title: '', text: 'El estado del resultado esta vacio' });
                return 
                } 
                console.log("BlinkIDCombined results", result);
                console.log("faceImage", result.faceImage);
                console.log("encodedImage", result.faceImage.encodedImage);
                console.log("fathersName", result.fathersName);
                console.log("mothersName", result.mothersName);

                const { faceImage } = result;
                const { encodedImage } = faceImage;
                const _arrayBufferToBase64 = (buffer) => {
                    let binary = '';
                    let bytes = new Uint8Array(buffer);
                    let len = bytes.byteLength;
                    for (let i = 0; i < len; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    return window.btoa(binary);
                }
                let photo = _arrayBufferToBase64(encodedImage.buffer);
                console.log("photo",photo)
                Swal.fire({
                    title: 'DUI',
                    showDenyButton: true,
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonText: 'Guardar',
                    denyButtonText: 'No Guardar',
                    cancelButtonText: 'Cancelar',
                    html: `<img height="150" width:"200" src="data:image/png;base64,${photo && photo}">
                           <br> Nombre: ${result.firstName} 
                           <br> Apellido: ${result.lastName}
                           <br> Fecha de Nacimiento: ${result.dateOfBirth.year}-${result.dateOfBirth.month}-${result.dateOfBirth.day} 
                           <br> Lugar de Nacimiento: ${result.placeOfBirth} 
                           <br> Fecha de Emisión: ${result.dateOfIssue.day}-${result.dateOfIssue.month}-${result.dateOfIssue.year}
                           <br> Fecha de Expiracion: ${result.dateOfExpiry.day}-${result.dateOfExpiry.month}-${result.dateOfExpiry.year}
                           <br> Numero de Documento: ${result.documentNumber} 
                           <br> Direccion: ${newAddress} 
                           <br> Nacionalidad: ${result.nationality && 'SALVADOREÑA'} 
                           <br> Genero: ${result.sex} 
                           <br> Estado Marital: ${result.maritalStatus}
                           <br> Ocupacion: ${result.profession}
                           `
                }).then((result) => {
                    if (result.isConfirmed) Swal.fire('Guardado!', '', 'success')
                    else if (result.isDenied) Swal.fire('La informacion no fue guardada', '', 'info')
                })
                videoRecognizer?.releaseVideoFeed();
                recognizerRunner?.delete();
                combinedGenericIDRecognizer?.delete();
                clearDrawCanvas();
                document
                    .getElementById("screen-start")
                    ?.classList.remove("hidden");
                document
                    .getElementById("screen-scanning")
                    ?.classList.add("hidden");
            }, scanTimeoutSeconds * 1000
        );
    } catch (error) {
        console.error("Error during initialization of VideoRecognizer:", error);
        Swal.fire({ icon: 'error', title: '', text: `Error during initialization of VideoRecognizer:${error.message}` });
        return;
    }
}
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
}
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
        scaledVideoHeight / cameraFeed.videoHeight
    );
    drawContext.transform(
        transformMatrix[0],
        transformMatrix[3],
        transformMatrix[1],
        transformMatrix[4],
        transformMatrix[2],
        transformMatrix[5]
    );
}
const clearDrawCanvas = () => {
    cameraFeedback.width = cameraFeedback.clientWidth;
    cameraFeedback.height = cameraFeedback.clientHeight;
    drawContext.clearRect(0, 0, cameraFeedback.width, cameraFeedback.height);
}
const setupColor = (displayable) => {
    let color = "#FFFF00FF";
    if (displayable.detectionStatus === 0) {
        color = "#FF0000FF";
    } else if (displayable.detectionStatus === 1) {
        color = "#00FF00FF";
    }
    drawContext.fillStyle = color;
    drawContext.strokeStyle = color;
    drawContext.lineWidth = 5;
}
const setupMessage = (displayable) => {
    switch (displayable.detectionStatus) {
        case BlinkIDSDK.DetectionStatus.Fail:
            updateScanFeedback("Escaneando...");
            break;
        case BlinkIDSDK.DetectionStatus.Success:
        case BlinkIDSDK.DetectionStatus.FallbackSuccess:
            updateScanFeedback("Detencion exitosa");
            break;
        case BlinkIDSDK.DetectionStatus.CameraAtAngle:
            updateScanFeedback("Ajustar el ángulo");
            break;
        case BlinkIDSDK.DetectionStatus.CameraTooHigh:
            updateScanFeedback("acercar el documento");
            break;
        case BlinkIDSDK.DetectionStatus.CameraTooNear:
        case BlinkIDSDK.DetectionStatus.DocumentTooCloseToEdge:
        case BlinkIDSDK.DetectionStatus.Partial:
            updateScanFeedback("Aleja el documento");
            break;
        default:
            console.warn(
                "¡Estado de detección no controlado!",
                displayable.detectionStatus
            );
    }
}
let scanFeedbackLock = false;

const updateScanFeedback = (message, force) => {
    if (scanFeedbackLock && !force) {
        return;
    }
    scanFeedbackLock = true;
    scanFeedback.innerText = message;
    window.setTimeout(() => (scanFeedbackLock = false), 1000);
}
main();
