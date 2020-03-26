import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as sessionActions from '../../actions/sessionActions';
import Input from '../Custom/Input';
import logo from '../../../logo.png';

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        username: '',
        password: ''
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(history) {
    const { user } = this.state;
    const { login } = this.props.actions;
    login(user, history);
  }

  onChange(e) {
    const { value, name } = e.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  }

  render() {
    const { user: { username, password } } = this.state;
    const SubmitButton = withRouter(({ history }) => (
      <button
        className='btn btn-primary'
        onClick={() => this.onSubmit(history)}
        type="submit">Submit
      </button>
    ));

    document.getElementById('title').innerHTML = 'Login | Events Management System';
    
    return (
      <div>
        <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <figure className="footer-logo">
                  <a href="/"><img width="15%" src={logo} alt="logo" /></a>
                </figure>
                <div className="contact-form">
                  <div className="row">
                    <div className="col-12 col-md-4"></div>
                    <div className="col-12 col-md-4">
                      <Input
                        name="username"
                        value={username}
                        label="Username"
                        type="text"
                        onChange={this.onChange}
                        autofocus required
                      />
                      <Input
                        name="password"
                        value={password}
                        label="Password"
                        type="password"
                        onChange={this.onChange}
                      />
                      <hr />
                      <div className="row">
                        <div className="col-12 text-center">
                          <SubmitButton />
                        </div>
                      </div>
                    </div>
                    <div className='col-12 col-md-4'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const { object } = PropTypes;

Login.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(null, mapDispatch)(Login);