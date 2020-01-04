import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PhonePartsScreen from './Screens/PhonePartsScreen';
import LoginScreen from './Screens/LoginScreen';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { AuthProvider } from './Auth';

const AuthRoutes = ({ isAuthenticated }) => {

  if(!isAuthenticated) return <Redirect to="/login" />;

  return (
    <React.Fragment>
      <Sidebar />
      <div id="main">
        <Topbar />
        <Switch>
          <Route exact path="/calc" render={() => "oka k ase"} />
          <Route exact path="/" component={PhonePartsScreen} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

const App = ({ isVerifying, isAuthenticated, user }) => {
  
  if (isVerifying) return <div>Loading</div>

  return (
    <AuthProvider user={user}>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route render={ props => <AuthRoutes isAuthenticated={isAuthenticated} />} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

const mapStateToProps = state => ({
  isVerifying: state.isVerifying,
  isAuthenticated: state.isAuthenticated,
  user: state.user
})

export default connect(mapStateToProps)(App);