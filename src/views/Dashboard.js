import { useState,useEffect } from "react";
import styled from "styled-components";
import authService from "../services/auth.service";
import { Link, useNavigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const data = authService.gerCurrentUser();
  const { user, token } = data;
  const [curretUser, setCurrentUser] = useState(user);

  const logOut = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <Wrapper>
      <header>
        <Link to="/dashboard">Inicio</Link>
        <Link to="scanner">Scanner</Link>
        <Link to="documentos">Documentos</Link>
        <Link to="/" onClick={() => logOut()}>
          Salir
        </Link>
      </header>
      <h4>Usuario: {curretUser.user_name}   Correo: {curretUser.email}</h4>
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
    flex-wrap: wrap;
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
