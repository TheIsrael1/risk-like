import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homebase from './screens/Homebase';
import Intro from './screens/Intro';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />}/>
        <Route path='/home-base' element={<Homebase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
