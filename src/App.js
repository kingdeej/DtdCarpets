//styles
import './App.css';
import './styles/AddEmail/AddEmail.css';
import './styles/AdminPage/AdminPage.css';
import './styles/Customer/Customer.css';
import './styles/Customers/Customers.css';
import './styles/ReviewPage/ReviewPage.css';
import './styles/ThankYou/ThankYou.css';
import './styles/HomeScreen/HomeScreen.css';
import './styles/NavBar/NavBar.css';
import './styles/UseForm/UseForm.css';


//components / screens
import {React} from 'react'
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
import ReviewAdmin from './Screens/ReviewAdmin';

function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
        <div className="app">
          <Route path="/useform/" component={UseForm}></Route>
          <Route path="/reviews" component={ReviewScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <ProtectedRoute path="/admin" exact component={AdminPage} />
          <ProtectedRoute path="/admin/customers" component={Customers}/>
          <ProtectedRoute path="/admin/customer/:id" component={Customer}/>
          <ProtectedRoute path="/admin/addEmail" exact component={AddEmail}/>
          <ProtectedRoute path="/admin/reviews" component={ReviewAdmin}/>
       </div>
    </BrowserRouter>  
    );
}

export default App;
