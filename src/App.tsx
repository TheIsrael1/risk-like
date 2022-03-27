import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homebase from './screens/Homebase';
import Intro from './screens/Intro';
import './styles/main.scss';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />}/>
        <Route path='/home' element={<Homebase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
