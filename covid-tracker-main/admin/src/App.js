import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { LogIn, NavBar, Home, Products } from './components';

function App() {

  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
