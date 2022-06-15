import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SDKScanner from '../views/SDKScanner';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Documents from '../views/Documents';
import PrivateRoute from './PrivateRoute';
import NoMatch from '../views/NoMatch';
import APIScanner from '../views/APIScanner';
const ConfigRoute = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route element={<PrivateRoute />}>
					<Route path='/dashboard/*' element={<Dashboard />}>
						<Route path='sdkscanner' element={<SDKScanner />} />
						<Route path='apiscanner' element={<APIScanner />} />
						<Route path='documentos' element={<Documents />} />
					</Route>
				</Route>
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</Router>
	);
};

export default ConfigRoute;
