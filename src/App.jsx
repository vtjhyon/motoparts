import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './master/Login';
import Master from './master/Master';
import CreateSP from './master/CreateSP';

const App = () => {
  const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
    
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login setToken={setToken}/>} />
        {token?<Route path={'/master'} element={ <Master token={token} />} />:""}
        {token?<Route path={'/create'} element={ <CreateSP token={token} />} />:""}
      </Routes>
    </Router>
  );
};

export default App;
