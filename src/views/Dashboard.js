import { useState,useEffect } from "react";
import styled from "styled-components";
import authService from "../services/auth.service";
import { Link, useNavigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const data = authService.gerCurrentUser();
  const { user, token } = data;
  const [curretUser, setCurrentUser] = useState(user);

  useEffect(() => {
    const isMounted = true;
    window.onpopstate = () => {
      if (isMounted) {
        const { pathname } = window.location;
        if (pathname.indexOf("/") > -1 || pathname.indexOf("/login") > -1 && token) {
          navigate("/dashboard");
          window.location.reload()
        }
      }
    };
  }, [window.location.pathname]);

  const logOut = () => {
    authService.logout();
    navigate("/login");
    window.location.reload()
  };

  return (
    <Wrapper>
      <header>
        <Link to="/dashboard">Home</Link>
        <Link to="scanner">Scanner</Link>
        <Link to="/" onClick={() => logOut()}>
          Log Out
        </Link>
      </header>
      <h1>{curretUser.user_name}</h1>
      <h1>{curretUser.email}</h1>
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    width: 30vw;
    background: currentColor;
  }
  a {
    color: darkgray;
  }

  a:hover {
    color: darkgray;
  }
  .ant-btn {
    background: darkgray;
    color: #fff;
  }
`;
export default Dashboard;
