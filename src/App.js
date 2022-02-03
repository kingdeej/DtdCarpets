import './App.css';
import {React, useState} from 'react'
import {BrowserRouter, Route,} from "react-router-dom" ;
import HomeScreen from './Screens/HomeScreen';
import UseForm, { useForm } from './Screens/UseForm';
import Navbar from './components/Navbar';
import ReviewScreen from './Screens/ReviewScreen';
import ProtectedRoute from './components/ProtectedRoute';
import { AdminPage } from './Screens/AdminPage';
import AddEmail from './Screens/AddEmail';
import Customer from './Screens/Customer';
import Customers from './Screens/Customers';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <div className="app">
          <Route path="/useform/" component={UseForm} ></Route>
          <Route path="/reviews" component={ReviewScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <ProtectedRoute path="/admin" exact component={AdminPage}/>
          <ProtectedRoute path="/admin/customers" component={Customers}/>
          <ProtectedRoute path="/admin/customer/:id" component={Customer}/>
          <ProtectedRoute path="/admin/addEmail" exact component={AddEmail}/>
       </div>
    </BrowserRouter>  
    );
}

export default App;
