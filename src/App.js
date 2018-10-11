import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tabla from './Tabla';
import FormularioMantenimiento from './FormularioMantenimiento';
import CRUD from './CRUD';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
     
	  <CRUD/>
    );
  }
}

export default App;
