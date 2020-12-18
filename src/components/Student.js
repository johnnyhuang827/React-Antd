import React, {Component} from 'react';
import 'isomorphic-fetch';
import { Button, Table, PageHeader, Space, Input, Modal, message } from 'antd';
import "antd/dist/antd.css";
import "../index.css";
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'

const { confirm } = Modal;




export default class studentList extends Component {
  constructor() {
    super();
    this.state = {}

  }
  async componentDidMount() {
    let students = await (await fetch(`http://localhost:8080/student/queryByOrder`)).json();
    this.setState({students});
  }




render() {
    let {students = []} = this.state;
    const { Search } = Input;

    const onSearch = value => console.log(value);

    const deleteItem = record => {
      // return function(e) {
        confirm({
          title: 'Do you Want to delete these items?',
          icon: <ExclamationCircleOutlined />,
          onOk() {
    
            let path = "http://localhost:8080/student/"+ record;
            fetch(path ,{
              method:"DELETE",
              headers: {      
              'content-type': 'application/json',
              'accept':'application/json, text/plain, */*'
            },
            }).then((response) => {
            // 这里拿到的 response 并不是一个 对象
            return response.json();  // 将 response.body 通过 JSON.parse 转换为 JS 对象
          })
          .then(data => {
            if(data.error!= null){
              message.error('Delete Failed!');
            }
            else{
              message.success('Delete Successful!');
              window.location.reload()
            }
          });
          },
          onCancel() {
            // console.log('Cancel');
            
          },
        });
        
      // }

    };

    const ModifyItem = record => {
      cookie.save('studentId', record.studentId)
      cookie.save('studentName', record.studentName)
      // alert(record.studentBirthday)
      // cookie.save('studentBirthday', record.studentBirthday)
      cookie.save('studentDepartmentId', record.studentDepartmentId)
      cookie.save('studentGender', record.studentGender)
      this.props.history.push("/editStudent")

    };


    const onSearchId = value => {

      let path = "http://localhost:8080/student/"+ value;
      
      fetch(path ,{
          method:"GET",
          headers: {      
          'content-type': 'application/json',
          'accept':'application/json, text/plain, */*'
          },
        }).then((response) => {

        return response.json();  
      })
      .then(data => {
        if(data.studentId != null)
          console.log(data);
      });

      

    };


    const columns = [
      {
        title: 'Id',
        dataIndex: 'studentId',
        key: 'studentId',
      },
      {
        title: 'Name',
        dataIndex: 'studentName',
        key: 'studentName',
      },
      {
        title: 'Birthday',
        dataIndex: 'studentBirthday',
        key: 'studentBirthday',
      },
      {
        title: 'Gender',
        dataIndex: 'studentGender',
        key: 'studentGender',
      },
      {
        title: 'Department Id',
        dataIndex: 'studentDepartmentId',
        key: 'studentDepartmentId',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
              <Button type = 'link' onClick={() =>ModifyItem(record)}> 
                    Modify
                </Button>
                <Button type = 'link' danger onClick={() => deleteItem(record.studentId)}> 
                    Delete
                </Button>
          </Space>
        ),
      },
    
    ];
    

    return (

      <div>

        <PageHeader
            ghost={false}
            className="site-page-header"
            onBack={() => window.history.back()}
            title="Student Manage Table"
          >
          <div >
          <Search
              style={{width: '20%' }} 
              placeholder="Search By Name"
              allowClear
              onSearch={onSearch}
            />,
            <Search
              style={{width: '20%', marginLeft: "20px"}} 
              placeholder="Search By Id"
              allowClear
              onSearch={onSearchId}
            />,
              <Search
              style={{width: '20%' , marginLeft: "20px"}} 
              placeholder="Search By Department Id"
              allowClear
              onSearch={onSearch}
            />,
     
              <Button type = 'primary' style={{ marginLeft: "400px"}} > 
                  <Link to="/" >
                    <div>Home</div>
                </Link>
              </Button>,
              <Button type = 'primary' style={{ marginLeft: "20px"}}>  
                <Link to="/addStudent" >
                    <div>Add</div>
                </Link>
              </Button>



          </div>
          </PageHeader>
        <br/>
        <Table 
            style={{width: '90%' , marginTop: "20px", margin: 'auto'}} 
            dataSource={students} 
            columns={columns} 
            rowKey="studentId"
        />

      </div>

    );
  }
}







