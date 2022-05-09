import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Avatar, Button, Divider } from 'antd';
import propTypes from 'prop-types';

const HeaderMenu = ({ user, out }) => {
	const photo =
		'https://img.blogs.es/anexom/wp-content/uploads/2021/12/perfil-1024x754.jpg';
	console.log(user);
	return (
		<Wrapper>
			<nav>
				<div className='user'>
					<Avatar src={<img src={photo} />} size={50} />
					<span className='user-data'>
						<>
							<b>{user.user_name}</b>
							<br />
							<p>{user.email}</p>
						</>
					</span>
				</div>
				<Divider type='vertical' plain></Divider>
				<NavLink to='/dashboard' className='link'>
					INICIO
				</NavLink>
				<NavLink
					to='scanner'
					className={({ isActive }) => (isActive ? 'link-active' : 'link')}
				>
					SCANNER
				</NavLink>
				<NavLink
					to='documentos'
					className={({ isActive }) => (isActive ? 'link-active' : 'link')}
				>
					DOCUMENTOS
				</NavLink>
				<NavLink
					to='/'
					className={({ isActive }) => (isActive ? 'link-active' : 'link')}
					onClick={() => out()}
				>
					<Button type='primary'>Salir</Button>
				</NavLink>
			</nav>
		</Wrapper>
	);
};

if (process.env.NODE_ENV !== 'production') {
	HeaderMenu.propTypes = {
		user: propTypes.object,
		out: propTypes.func,
	};
}

const Wrapper = styled.div`
	nav {
		display: flex;
		align-items: center;
		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
		width: 100vw;
		justify-content: space-around;
		flex-wrap: wrap;
		padding: 20px;
	}

	.user {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	.ant-avatar {
		margin-top: -10px;
	}
	.user-data {
		margin: 0px 20px;
	}
	.user-data b {
		color: #707070;
		font-size: 18px;
		font-weight: bold;
	}
	.user-data p {
		color: #707070;
		font-size: 14px;
		font-weight: 600;
	}
	.ant-divider-vertical {
		height: 4em;
		border-left: 0.5px solid #707070;
		margin-top: -12px;
	}
	/* Basic styles for nav links */
	nav a {
		display: flex;
		align-items: center;
		padding-left: 30px;
		// padding-right: 30px;
		height: 100%;
		text-decoration: none;
	}

	/* Specific styles for non-active links */
	.link {
		color: #000;
		color: #707070;
		font-weight: 600;
	}
	/* Specific styles for active links */
	.link-active {
		font-weight: bold;
		color: #707070;
		//text-decoration: underline;
		// text-decoration-color: #2d96d3;
		line-height: 2;
		border-bottom: 1px solid #2d96d3;
		padding: 0px;
	}

	@media (max-width: 900px) {
		.link-active {
			border-bottom: 1px solid #2d96d3;
			padding: 5.5px;
		}
	}
	@media (max-width: 340px) {
		nav {
			padding: 5px;
		}
		.ant-btn {
			margin-top: 5px;
		}
	}
`;
export default HeaderMenu;
