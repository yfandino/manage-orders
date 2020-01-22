import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import OrderLineListScreen from './Screens/OrderLineListScreen';
import OrderListScreen from './Screens/OrderListScreen';
import LoginScreen from './Screens/LoginScreen';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { AuthProvider } from './Auth';
import { Loading } from './common';

const AuthRoutes = ({ isAuthenticated }) => {

  if(!isAuthenticated) return <Redirect to="/login" />;

  return (
    <React.Fragment>
      <Sidebar />
      <main id="main">
        <Topbar />
        <Switch>
          <Route exact path="/calc" render={() => "oka k ase"} />
          <Route exact path="/orders" component={OrderListScreen} />
          <Route exact path="/" component={OrderLineListScreen} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

const App = ({ session }) => {
  
  if (session.isVerifying) return <Loading />

  return (
    <AuthProvider user={session.user}>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route render={ props => <AuthRoutes isAuthenticated={session.isAuthenticated} {...props} />} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

const mapStateToProps = state => ({
  session: state.session
})

export default connect(mapStateToProps)(App);