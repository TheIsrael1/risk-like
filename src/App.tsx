import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homebase from './screens/Homebase';
import Intro from './screens/Intro';
import { Provider } from "react-redux";
import store from "./redux/store"


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />}/>
          <Route path='/home-base' element={<Homebase />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
