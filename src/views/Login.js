import styled from "styled-components";
import { Form, Input, Button, Checkbox } from "antd";
import BackgroundSlider from "react-background-slider";
import logo from "../assets/logo.png";
import fondo1 from "../assets/FONDO-1-min.png";
import fondo2 from "../assets/FONDO-2-min.png";
import fondo3 from "../assets/FONDO-3-min.png";
import { FaUser } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { useNavigate,useLocation } from "react-router-dom";
import authService from "../services/auth.service";
import { useEffect } from "react";

const SingIn = () => {
  const navigate = useNavigate();  
  const location = useLocation();
  const data = authService.gerCurrentUser();
  
  const from = location.state?.from?.pathname || "/";
  
  console.log(from)
  useEffect(()=>{
     if (data?.token) {
     navigate(from, { replace: true });
     return history.go(-1)
     }

  },[])
   
  const onFinish = (values) => {
    const { email, password } = values;
    authService.login(email, password).then(
      () => {
        navigate('/dashboard')
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.error) ||
          error.message ||
          error.toString();
      }
    ); 
  };

  

  return (
    <Wrapper>
      <BackgroundSlider
        images={[fondo1, fondo2, fondo3]}
        duration={5}
        transition={2}
      />
        <div className="box-login">
          <img src={logo} />
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "¡Por favor ingrese su nombre de usuario!",
                },
              ]}
            >
              <Input placeholder="Email" addonBefore={<FaUser />} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "¡Por favor ingrese su contraseña!",
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                addonBefore={<AiFillLock />}
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
              Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
        </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .box-login {
    position: absolute;
    width: 40%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 2%;
  }

  img {
    max-width: 100%;
    display: block;
    margin: auto;
  }
  .ant-form {
    margin: -2% 20% 13% 20%;
  }
  .ant-btn-primary {
    color: black;
    border-color: black;
    background: #fff;
    cursor: default;
  }
  .ant-input-group-addon {
    background: #646458;
  }
  .ant-input {
    background: darkgrey;
  }
  .ant-input-affix-wrapper {
    background: darkgrey;
  }

  .ant-checkbox-inner {
    border-style: inset;
    border-color: black;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: darkgray;
  }
  .ant-btn-primary {
    width: 100%;
  }
`;
export default SingIn;
