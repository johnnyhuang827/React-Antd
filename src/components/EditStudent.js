import { Form, Input, Button, PageHeader, DatePicker, Select, message } from 'antd';
import React, {Component} from 'react';
import moment from 'moment';
import cookie from 'react-cookies'

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 11, span: 10 },
};



export default class Editstudent extends Component {
    formRef = React.createRef();

    constructor() {
      super();
      this.state = {}
      this.onFinish = this.onFinish.bind(this);
      this.onFinishFailed = this.onFinishFailed.bind(this);
    }

  

    onFinish(values) {
      values.studentBirthday = moment(values.studentBirthday).format('YYYY-MM-DD')

      fetch(`http://localhost:8080/student`, {
        method:"PUT",
        headers: {      
         'content-type': 'application/json',
         'accept':'application/json, text/plain, */*'
       },
        body:JSON.stringify(values)


      }).then((response) => {
       // 这里拿到的 response 并不是一个 对象
       return response.json();  // 将 response.body 通过 JSON.parse 转换为 JS 对象
     })
     .then(data => {
       if(data.error!= null){
         message.error('Operation Failed!');
       }
       else{
        message.success('Operation Successful!');
        this.props.history.goBack();
       }

     });

    };
  
    onFinishFailed(errorInfo){
      console.log('Failed:', errorInfo);
    };

    disabledDate(current) {
      // Can not select days before today and today
      return current && current > moment().endOf('day');
    }


    async componentDidMount() {
      this.formRef.current.setFieldsValue({
        studentId: cookie.load('studentId'),
        studentName: cookie.load('studentName'),
        studentDepartmentId: cookie.load('studentDepartmentId'),
        studentGender: cookie.load('studentGender'),
      });
    }
  


    
  
  render() {
    //   let {students = []} = this.state;
    return(
      <div  >
      <PageHeader
         ghost={false}
         className="site-page-header"
         onBack={() => window.history.back()}
         title="Edit Student"
       /><br/>
        <Form
          {...layout}
          name="basic"
          ref={this.formRef}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >

        <Form.Item
            label="Student Id"
            name="studentId"
            
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Student Name"
            name="studentName"
            rules={[{ required: true, message: 'Please input student name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
              label="Student Birthday"
              name="studentBirthday"
              rules={[{ required: true, message: 'Please input student birthday!' }]}
          >
              <DatePicker disabledDate={this.disabledDate}/>
            </Form.Item>
          <Form.Item
            label="Student Gender"
            name="studentGender"
            rules={[{ required: true, message: 'Please input student gender!' }]}
          >
              <Select>
                <Select.Option value="0">Female</Select.Option>
                <Select.Option value="1">Male</Select.Option>
              </Select>
          </Form.Item>
          <Form.Item
            label="Student DepartmentId"
            name="studentDepartmentId"
            rules={[{ required: true, message: 'Please input student departmentId!' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>

          </Form.Item>
        </Form>
        </div>
      );
        
    }
  }
  
  