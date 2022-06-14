import { useState } from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import {
	Camera,
	CameraInterface,
	ImgDetailPopup,
	useCapture,
} from 'react-browsercam';

const BrowserCam = () => {
	const {
		image,
		isAccessingCamera,
		videoRef,
		capture,
		setBeforeCapture,
		isNotSupported,
		isPermissionDenied,
	} = useCapture({ imageFormat: 'image/png' });
	const [displayDetails, setDisplayDetails] = useState(false);
	console.log(image);
	console.log(isNotSupported);
	console.log(isAccessingCamera);
	console.log(isPermissionDenied);

	return (
		<Rnd style={{ ReDr }} default={{ x: 90, y: 90, width: 360, height: 240 }}>
			<Camera
				videoRef={videoRef}
				isAccessingCamera={isAccessingCamera}
				flash={setBeforeCapture}
				inPicture={true}
			>
				<CameraInterface
					image={image}
					handleCapture={capture}
					openImage={() => setDisplayDetails(true)}
				>
					<ImgDetailPopup
						image={image}
						visible={displayDetails}
						handleClose={() => setDisplayDetails(false)}
					/>
				</CameraInterface>
			</Camera>
		</Rnd>
	);
};

const ReDr = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 'solid 1px #ddd';
	background: #f0f0f0;
`;
export default BrowserCam;
