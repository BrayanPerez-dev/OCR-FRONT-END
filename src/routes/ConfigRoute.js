import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SDKScanner from '../views/SDKScanner';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Documents from '../views/Documents';
import PrivateRoute from './PrivateRoute';
import NoMatch from '../views/NoMatch';
import APIScanner from '../views/APIScanner';
import WebCam from '../components/Webcam/WebCam';
import BrowserCam from '../components/Webcam/BrowserCam';
const ConfigRoute = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route element={<PrivateRoute />}>
					<Route path='/dashboard/*' element={<Dashboard />}>
						<Route path='sdkscanner' element={<SDKScanner />} />
						<Route path='apiscanner' element={<APIScanner />}>
							<Route path='browsercam' element={<BrowserCam />} />
							<Route index path='webcam' element={<WebCam />} />
						</Route>
						<Route path='documentos' element={<Documents />} />
					</Route>
				</Route>
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</Router>
	);
};

export default ConfigRoute;
