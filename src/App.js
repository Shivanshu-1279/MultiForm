import './App.css';
import Address from './Component/address/Address';
import General from './Component/general/General';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Submit from './Component/submit/Submit';
import { useState } from 'react';
function App() {

  //  using useState hook method for state management between components and updating data in the application.
const [generaldetails, setGeneraldetails] = useState({});
const [addressdetails, setAddressdetails] = useState({});

const submitGeneral=(data)=>{
  setGeneraldetails(data);
}

const submitAddress=(data)=>{
  setAddressdetails(data);
}

  return (

    <Router>
      <Switch>
        <Route exact path ='/'> 
        <General onSubmit={submitGeneral} />  
        </Route>
        <Route exact path ='/address'> 
        <Address onSubmit={submitAddress} /> 
        </Route>
        <Route exact path ='/submit'> 
        <Submit  generaldetails={generaldetails} addressdetails={addressdetails}/> 
        </Route>     
        {/* <Redirect to="/" />    */}
      </Switch>
    </Router>
  );
}

export default App;