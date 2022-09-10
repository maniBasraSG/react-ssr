import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import appRoutes from './Routes';
import './assets/scss/style.scss';

function App() {
  return <BrowserRouter>{renderRoutes(appRoutes)}</BrowserRouter>;
}

export default App;
