import React from 'react';
import './css/App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './Login'
import Signin from './Signin'
import Main from './Main'

const App = () => (
  <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} /> 
      <Route exact path="/signin" component={Signin} />
      <Route path="/main" component={Main} />
  </BrowserRouter>
)
export default App;
