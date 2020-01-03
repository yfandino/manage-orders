import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PhonePartsScreen from '../components/Screens/PhonePartsScreen';
import LoginScreen from '../components/Screens/LoginScreen';
import { session } from '../redux/actions';

const App = ({ user, session }) => {
  
  useEffect(() => {
    session();
  },[]);

  if (!user) return <LoginScreen />

  return (
    <div id="main">
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route exact path="/" component={PhonePartsScreen} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { session })(App);