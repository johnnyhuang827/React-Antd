

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import * as serviceWorker from './serviceWorker';
// import {BrowserRouter, Route} from "react-router-dom";
// import StudentList from "./components/StudentList";
import App from './App';
 
ReactDOM.render(<App/>, document.getElementById('root'));


// ReactDOM.render((
//   <BrowserRouter>
//     <div className="container">
//       <Route path="/"  exact component={StudentList} />
//     </div>
//   </BrowserRouter>
// ),
//   document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();