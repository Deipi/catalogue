import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProductsForm from './containers/products-form';


class App extends Component {
  render() {
    return (
      <div className="App">        
        <ProductsForm />     
      </div>
    );
  }
}

export default App;
