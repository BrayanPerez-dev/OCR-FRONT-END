import styled from 'styled-components';
import authService from '../services/auth.service';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import MainMenu from '../components/MainMenu';
import HeaderMenu from '../components/HeaderMenu';

const Dashboard = () => {
	const data = authService.gerCurrentUser();
	const { user } = data;
	const location = useLocation();
	const navigate = useNavigate();

	const logOut = () => {
		authService.logout();
		navigate('/');
	};
	const displayMenu = () => {
		const { pathname } = location;
		if (pathname === '/dashboard' || pathname === '/dashboard/')
			return <MainMenu user={user} out={logOut} />;
		return <HeaderMenu user={user} out={logOut} />;
	};

	return (
		<Wrapper>
			{displayMenu()}
			<Outlet />
		</Wrapper>
	);
};

const Wrapper = styled.div``;
export default Dashboard;
