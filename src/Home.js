import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const {Text } = Typography;
 
 
class Home extends React.Component{

    constructor() {
        super();
        this.state = {}

        this.queryStudentInfo = this.queryStudentInfo.bind(this);
        this.queryStudent = this.queryStudent.bind(this);
      }
    
    flags = window.sessionStorage.getItem("admin") == null

    text = window.sessionStorage.getItem("admin") == null ? "Hi! Please log in first!" : "Hi " + window.sessionStorage.getItem("admin") + "! This is Home Page!"; 

    queryStudent(){
        this.props.history.push("/student/");
    }

    queryStudentInfo(){
        this.props.history.push("/studentList/");
    }


    render(){
        return(
            <div>
                <div style={{textAlign: 'center', marginTop: "150px"}} >
                    <Text style={{fontSize: '80px' , color :'orange'}} 
                    >{this.text}  </Text>
                    <br/>

                    <Button style={{textAlign: 'center'}}>                  
                        <Link to="/login" >
                             <div>Log In</div>
                        </Link>
                    </Button>
                    <div>&nbsp; </div>

                    <Button style={{textAlign: 'center'}} disabled={this.flags} onClick={this.queryStudent} >                  
                        Student Manage Table
                    </Button>
  
                    <div>&nbsp; </div>

                    <Button style={{textAlign: 'center'}} disabled={this.flags} onClick={this.queryStudentInfo}>                  
                        Student Information Table
                    </Button>

                </div>
            </div>
            );
    }
}
 
export default Home;