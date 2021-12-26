import './App.css';
import React from 'react'
import {BrowserRouter, Route,} from "react-router-dom" ;
import HomeScreen from './Screens/HomeScreen';
import useForm from './Screens/UseForm';
import Navbar from './components/Navbar';
import ReviewScreen from './Screens/ReviewScreen';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <div className="app">
          <Route path="/useform/" component={useForm}></Route>
          <Route path="/reviews" component={ReviewScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </div>
    </BrowserRouter>  
    );
}

export default App;
