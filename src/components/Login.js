import { Form, Input, Button,  PageHeader, message , Checkbox, Card  } from 'antd';
import React, {Component} from 'react';
import qs from "querystring";
import { UserOutlined, LockOutlined } from '@ant-design/icons';


export default class Login extends Component {
    constructor() {
      super();
      this.state = {}
      this.onFinish = this.onFinish.bind(this);
      this.onFinishFailed = this.onFinishFailed.bind(this);
    }
    
    onFinish(values) {
      console.log('Success:', values);

      fetch(`http://localhost:8080/admin/login`, {
        method:"POST",
        headers: {      
         'content-type': 'application/x-www-form-urlencoded',
         'accept':'application/json, text/plain, */*'
       },

       body:qs.stringify(values) 
      }).then((response) => {
       // 这里拿到的 response 并不是一个 对象
       return response.json();  // 将 response.body 通过 JSON.parse 转换为 JS 对象
     })
     .then(data => {
       console.log(data); // {name: 'test', age: 1}
       if(data.adminId === 0){
         message.error("Login Failed");
       }
       else{
        message.success("Success, Welcome " + data.adminName + "!");
         window.sessionStorage.setItem("admin", data.adminName);

         this.props.history.goBack();
       }
     });

    };
  
    onFinishFailed(errorInfo){
      console.log('Failed:', errorInfo);
    };

    
  
  render() {

    return(     
    <div  >
      <PageHeader style={{ background:'rgb(245, 245, 245)'}}
         ghost={false}

         title="Login"
       /><br/>

    <Card style={{ background:'rgb(245, 245, 245)' , textAlign: 'center', marginTop: "150px", marginLeft: "700px", marginRight: "700px"}}>
       <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
    >
      <Form.Item 
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
    </Card>
       </div>




    
 );
        
    }
  }
  