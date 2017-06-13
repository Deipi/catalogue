import React, { PropTypes } from 'react'
import Login from '../components/products-login';
import { connect } from 'react-redux';
//import { fetchlogin } from '../actions/indexLogin';

class LoginComponent extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.actionSubmit = this.actionSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { push } = this.context.router.history;
    const { login } = nextProps;

    /*if (login.size) {
      push('/pedidos');
    }*/
  }

  actionSubmit(values) {
    const { dispatch } = this.props;
    //dispatch(fetchlogin(values.toJS()));
  }

  render() {
    return (
      <Login
        actionSubmit={ this.actionSubmit }
      />
    );
  }
}

export default connect(/*state => {
  return {
    login: state.get('login'),
  }
}*/)(LoginComponent);