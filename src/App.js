import './App.css';
import React, { useState } from 'react'
import {BrowserRouter, Route,} from "react-router-dom" ;
import HomeScreen from './Screens/HomeScreen';
import UseForm from './Screens/UseForm';
import Navbar from './components/Navbar';
import ReviewScreen from './Screens/ReviewScreen';
import ProtectedRoute from './components/ProtectedRoute';
import { AdminPage } from './Screens/AdminPage';


function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const button = () => {
    setIsAdmin(true);
  }
  
  return (
    <BrowserRouter>
      <Navbar />
        <div className="app">
          <Route path="/useform/" render={props => <UseForm button={button}/>} ></Route>
          <Route path="/reviews" component={ReviewScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <ProtectedRoute path="/admin" component={AdminPage} isAdmin={isAdmin}/>
        </div>
    </BrowserRouter>  
    );
}

export default App;
