import './App.css';
import React, { useEffect, useState } from 'react'
import {BrowserRouter, Route,} from "react-router-dom" ;
import HomeScreen from './Screens/HomeScreen';
import UseForm from './Screens/UseForm';
import Navbar from './components/Navbar';
import ReviewScreen from './Screens/ReviewScreen';
import ProtectedRoute from './components/ProtectedRoute';
import { AdminPage } from './Screens/AdminPage';
import AddEmail from './Screens/AddEmail';
import Customer from './Screens/Customer';
import Customers from './Screens/Customers';


function App() {
  const [isAdmin, setIsAdmin] = useState(true)
  const button = () => {
    setIsAdmin(true);
  }
  useEffect(() => {
    if (!window.location.pathname.includes("admin")) {
      console.log("admin");
    }
  })
  
  return (
    <BrowserRouter>
      <Navbar />
        <div className="app">
          <Route path="/useform/" render={props => <UseForm button={button}/>} ></Route>
          <Route path="/reviews" component={ReviewScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <ProtectedRoute path="/admin" exact component={AdminPage} isAdmin={isAdmin}/>
          <ProtectedRoute path="/admin/customers" component={Customers} isAdmin={isAdmin}/>
          <ProtectedRoute path="/admin/customer/:id" component={Customer} isAdmin={isAdmin}/>
          <ProtectedRoute path="/admin/addEmail" exact component={AddEmail} isAdmin={isAdmin}/>
       </div>
    </BrowserRouter>  
    );
}

export default App;
