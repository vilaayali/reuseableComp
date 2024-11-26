import React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import './App.css';
import WebsiteRouters from './WebRouters/websiteRouters';


function App() {


  return (
    <>
      <BrowserRouter>
        <button><NavLink to={'./firstpage'}>Firstpage</NavLink></button>
        <button><NavLink to={'./secondpage'}>SecondPage</NavLink></button>
        <button><NavLink to={'./thirdpage'}>ThirdPage</NavLink></button>
        <WebsiteRouters />
      </BrowserRouter>
    </>
  );
}

export default App;
