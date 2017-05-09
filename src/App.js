import React, { Component } from 'react';
import './App.css';
import {
  Link
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  render() {
    const { props: { children } } = this;
    return (
      <div className="App">
        <div className="App-header">
            <Link to="/">  <img src="http://www.deipi.com/images/logo.svg" width="200" heigth="200" alt="logo" /></Link>
          <h2>Bienvenido a CPR Soluciones</h2>
        </div>
        { children }

      </div>
    );
  }
}

export default App;