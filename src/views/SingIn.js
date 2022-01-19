import styled from 'styled-components'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const SingIn = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        const {email,password} = values
        console.log(email,password)
        fetch('https://intellityc-scanner-server.herokuapp.com/api/auth/singin',{
            method:'POST',
            headers:{ 'Content-Type': 'application/json', Accept: 'application/json' },
            body:JSON.stringify({email,password})
        })
        .then((res) => res.json())
        .then((data) => accessToScanner(data))
        .catch((error) => console.log(error))
    };
const accessToScanner = (token) => {
    console.log(token)
    navigate("/scanner")
}
    return (
        <Wrapper>
        <div className='singin-container'>
            <div className='box-login'>
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
            message: 'Please input your username!',
          },
        ]}
      >
        <Input placeholder='Email' addonBefore={<UserOutlined/>} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password placeholder='Password' addonBefore={<LockOutlined />}/>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item
      >
        <Button type="primary" htmlType="submit">
          Sing In
        </Button>
      </Form.Item>
    </Form>
            </div>
        </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`

.box-login{
    position: absolute;
    width: 65%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-style: groove;
    border-color: black;
}
.ant-form{
  margin: 10%;
}
.ant-btn-primary {
    color: black;
    border-color: black;
    background: #fff;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
}
.ant-input-group-addon{
    background: gray;
}
.ant-input{
    background: darkgrey;
}
.ant-input-affix-wrapper{
    background: darkgrey;
}

.ant-checkbox-inner{
    border-style: inset;
    border-color: black;
}

.ant-checkbox-checked .ant-checkbox-inner {
    background-color: darkgray;
}
.ant-btn-primary {
    width: 100%;
}
`
export default SingIn
