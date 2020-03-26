// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateRoute from './pages/PrivateRoute';

import Header from './pages/Static/Header';
import Footer from './pages/Static/Footer';
import Home from './pages/Home/Home';
import Events from './pages/Events/Events';
import About from './pages/About/About';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = ({authenticated, checked }) => (
  <Router>
    {checked &&
      <div>
        <Header />
        <div style={{marginTop:'3rem'}} className='App-body'>
        <Route exact path="/" render={()=><Home/>}/>
        <Route path='/events' render={() => <Events />} />
        <Route path='/about' render={() => <About />} />
        <PrivateRoute path='/dashboard' 
          component={()=><Dashboard />} 
          exact authenticated={authenticated} />
        <Route path="/login" component={Login} />
        </div>
        <Footer />
      </div>
    }
  </Router>
);

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = ({session}) => ({
  authenticated: session.authenticated,
  checked: session.checked,
});

export default connect(mapState)(App);
