import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home';


import Rooms from './components/Rooms';
import Search from "./components/Search";
import SelectedRoom from './components/SelectedRoom';


function App() {

  return (
    <div className="app">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/search" element={<Search />} />
        <Route path="/selectedroom/:id" element={<SelectedRoom />} />
      </Routes>
    </BrowserRouter>  
    </div>
  );
}

export default App;
