import { useState } from "react";
import styled from "styled-components";
import authService from "../services/auth.service";
import {useLocation,useNavigate, Outlet } from "react-router-dom";
import MainMenu from "../components/MainMenu";
import HeaderMenu from "../components/HeaderMenu";

const Dashboard = () => {
  const data = authService.gerCurrentUser();
  const { user, token } = data;
  const [curretUser, setCurrentUser] = useState(user);
  const location = useLocation();
  const navigate = useNavigate();  

  
  const logOut = () => {
    authService.logout();
    navigate("/");
  };
  const displayMenu = () => {
  console.log(location)
  const { pathname } = location
  if(pathname === '/dashboard' || pathname === '/dashboard/') return <MainMenu user={curretUser}  out={logOut}/>
  return <HeaderMenu user={curretUser} out={logOut}/>
  }

  return (
    <Wrapper>
      {displayMenu()}
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
 
`;
export default Dashboard;
