import React from 'react';
import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signin from './Signin';
import Main from './Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
