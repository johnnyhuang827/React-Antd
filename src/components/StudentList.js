import React, {Component} from 'react';
import 'isomorphic-fetch';
import { Button, Table, PageHeader } from 'antd';
import "antd/dist/antd.css";
import "../index.css";
import { Link } from 'react-router-dom';

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
    title: 'Gender',
    dataIndex: 'studentGender',
    key: 'studentGender',
  },
  {
    title: 'Age',
    dataIndex: 'studentAge',
    key: 'studentAge',
  },
  {
    title: 'Birthday',
    dataIndex: 'studentBirthday',
    key: 'studentBirthday',
  },
  {
    title: 'Department',
    dataIndex: 'studentDepartment',
    key: 'studentDepartment',
  },

];






export default class studentList extends Component {
  constructor() {
    super();
    this.state = {}
  }
  async componentDidMount() {
    let students = await (await fetch(`http://localhost:8080/studentVo/queryAll`)).json();//主要是从后台拿json数据

    this.setState({students});

  }

  handleClick() {

  }



  

render() {
    let {students = []} = this.state;

    return (


      <div>


        <PageHeader
            ghost={false}
            className="site-page-header"
            onBack={() => window.history.back()}
            title="Student Information Table"
            extra={[
              <Button type = 'primary'>
                <Link to="/" >
                    <div>Home</div>
                </Link>       
              </Button>
            ]}
          />
        <br/>
        <Table 
            style={{width: '90%' , marginTop: "20px", margin: 'auto'}} 
            dataSource={students} 
            columns={columns} 
            bordered
            pagination = {{ defaultPageSize: 5 }}
        />



      </div>
      
      
     





    );
  }
}







