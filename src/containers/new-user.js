import React from 'react'
import Registrar from '../components/new-user';
import { connect } from 'react-redux';
//import createRegistrar from '../actions/indexRegistrar';
//import { fetchregistrar } from '../actions/indexRegistrar';
//import { Link } from 'react-router-dom';
import { reset } from 'redux-form'

class RegistrarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.actionSubmit = this.actionSubmit.bind(this);
  }

  actionSubmit(values) {
    const { dispatch } = this.props;
    //dispatch(createRegistrar(values.toJS()));
    dispatch(reset('simpleRegistrar'));

  }

  render() {
    return (
      <Registrar
        actionSubmit={ this.actionSubmit }/>
    );
  }
}

export default connect()(RegistrarComponent);