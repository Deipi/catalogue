import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProductsForm from './containers/products-form';


class App extends Component {
  render() {
    return (
       <div className="App">
        <div className="App-header">
            <img src="http://www.deipi.com/images/logo.svg" width="200" heigth="200" alt="logo" />                            
          <h2>Bienvenido a CPR Soluciones</h2>
        </div>        
        <ProductsForm />     
      </div>
    );
  }
}

export default App;
