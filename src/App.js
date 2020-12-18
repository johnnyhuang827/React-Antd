import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';

import StudentList from './components/StudentList';
import Student from './components/Student';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import Login from './components/Login';
import Home from './Home';

 
class App extends React.Component {
    render(){
        return(
            <Router >
                <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/studentList" component={StudentList} />
                <Route exact path="/student" component={Student} />
                <Route exact path="/addStudent" component={AddStudent} />
                <Route exact path="/editStudent" component={EditStudent} />
                <Route exact path="/login" component={Login} />
                </div>
            </Router>
        )
    }
}
export default App;