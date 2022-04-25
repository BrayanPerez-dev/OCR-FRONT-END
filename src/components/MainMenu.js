import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card, Avatar, Carousel, Button } from "antd";
import logo from "../assets/logo.png";
import { AiOutlineScan } from "react-icons/ai";
import { HiDocumentSearch } from "react-icons/hi";
import { ImUserTie } from "react-icons/im";
import { IoExitOutline } from "react-icons/io5";
import WaveEffectOne from "./WaveEffectOne";
import WaveEffectTwo from "./WaveEffectTwo";

const MainMenu = ({ user, out }) => {
  const business =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Logo-siman-nuevo.png/640px-Logo-siman-nuevo.png";
  const photo =
    "https://img.blogs.es/anexom/wp-content/uploads/2021/12/perfil-1024x754.jpg";

  return (
    <Wrapper>
     <Card className="card-header"></Card>
      <div className="logos">
        <img className="business" src={logo} />
        <img className="business" src={business} />
      </div>
      <div className="user">
        <Avatar src={<img src={photo} />} size={50} />
        <span className="user-data">
          <>
            <b>{user.user_name}</b>
            <br />
            <p>{user.email}</p>
          </>
        </span>
      </div>
      <div className="waves">
        <WaveEffectOne firstColor={"#e65159"} secondColor={"#e65159"} />
        <WaveEffectTwo color={"#f9989d"} />
      </div>
      
      <div className="container-menu">
        <Carousel>
          <div className="menu">
            <Card>
              <AiOutlineScan size={50} />
              <Link to="scanner"><h4>SCANNER</h4></Link>
            </Card>
            <Card>
              <HiDocumentSearch size={50} />
              <Link to="documentos"><h4>VER DOCUMENTOS</h4></Link>
            </Card>
            <Card>
              <ImUserTie size={50} />
              <h4>EMPLEADO</h4>
            </Card>
            <Card>
              <AiOutlineScan size={50} />
              <h4>ESCANEAR MRZ</h4>
            </Card>
          </div>
          <div className="menu">
            <Card>
              <AiOutlineScan size={50} />
              <Link to="scanner"><h4>SCANNER</h4></Link>
            </Card>
            <Card>
              <HiDocumentSearch size={50} />
              <Link to="documentos"><h4>VER DOCUMENTOS</h4></Link>
            </Card>
            <Card>
              <ImUserTie size={50} />
              <h4>EMPLEADO</h4>
            </Card>
            <Card>
              <AiOutlineScan size={50} />
              <h4>ESCANEAR MRZ</h4>
            </Card>
          </div>
        </Carousel>
        <div className="exit">
          <Button onClick={() => out()} shape="circle" size="large" icon={<IoExitOutline />}/>
          <h3>SALIR</h3>
        </div>
      </div> 
    </Wrapper>
  );
};
const Wrapper = styled.div`
  // ocre puro #7f050d
  // ocre claro #e65159
  // ocre mas claro #f9989d
	width: 100%;
  height: 100vh;

  overflow: hidden;
  .waves {
    display: flex;
    flex-direction: column-reverse;
  }
  .card-header {
    background-color: #7f050d;
    background: linear-gradient(to bottom, #7f050d, #e65159);
  }
  .business {
    width: 100px;
  }
  .logos {
    padding: 0% 10%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
  }

  .user {
    padding: 0% 10%;
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
  .container-menu {
    margin-top: -3%;
    height: 100vh;
    overflow-y:auto;
    background: linear-gradient(to top, #7f050d, #e65159);
  }
  .menu {
    width: auto !important;
    display: flex !important;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    border: none !important;
  }

  .menu .ant-card {
    width: 37%;
    margin-top: 20px;
    height: 160px;
    color: #7f050d;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    //box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }

  .menu .ant-card h4 {
    display: flex;
    justify-content: center;
    margin-top: 22px;
    font-weight: bold;
    color: #707070;
  }

  .ant-carousel {
    padding: 0px 0px 50px 0px;
  }

  .ant-carousel .slick-dots-bottom {
    bottom: -12%;
  }

  .exit {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .ant-btn {
    background: #390003;
    color: #fff;
    width: 60px;
    height: 60px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border: 0px solid #fff;
  }

  .ant-btn:hover {
    border: 0px solid #fff;
  }
  .ant-btn-icon-only.ant-btn-lg > * {
    font-size: 28px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  h3 {
    color: #fff;
    margin-top: 16px;
  }
  .user-data b {
    color: #707070;
    font-size: 18px;
    font-weight: bold;
  }
  .user-data p {
    color: #707070;
    font-size: 14px;
    font-weight:600;
  }
  
  @media (max-height: 870px) {
  // overflow: inherit;
  }

  
  @media (max-width: 760px) {
    .waves{
      margin-top: -6%;
    }
    .container-menu{
    margin-top: -28%;
    }
  }
  
  @media (max-width: 300px) {
  overflow: inherit;
  }
`;

export default MainMenu;
