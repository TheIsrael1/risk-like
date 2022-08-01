import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homebase from './screens/Homebase';
import Intro from './screens/Intro';
import { Provider } from "react-redux";
import store from "./redux/store"
import { ToastContextProvider } from './components/Toast/ToastContexProvidert';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import Admin from './screens/Admin';
import AdminLogin from './screens/AdminLogin';
import AdminOnboarding from './screens/AdminOnboarding';
import UserDetails from './components/admin/detailsPages/UserDetails';
import TokenDetails from './components/admin/detailsPages/TokenDetails';
import AssetTypeDetails from './components/admin/detailsPages/AssetTypeDetails';
import AssetDetails from './components/admin/detailsPages/AssetDetails';
import LocationDetails from './components/admin/detailsPages/LocationDetails';


function App() {
  return (
    <ToastContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />}/>
	        <Route path='/onboarding' element={<Onboarding />} />
	        <Route path='/login' element={<Login />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/onboarding' element={<AdminOnboarding />} />
	        <Route path='/home-base' element={<Homebase />} />
          <Route path='/admin/dashboard' element={<Admin />} />
          <Route path='/admin/dashboard/users/:id' element={<UserDetails />} />
          <Route path='/admin/dashboard/tokens/:id' element={<TokenDetails />} />
          <Route path='/admin/dashboard/asset-types/:id' element={<AssetTypeDetails />} />
          <Route path='/admin/dashboard/assets/:id' element={<AssetDetails />} />
          <Route path='/admin/dashboard/locations/:id' element={<LocationDetails />} />
	        </Routes>
      </BrowserRouter>
    </Provider>
    </ToastContextProvider>
  );
}

export default App;
