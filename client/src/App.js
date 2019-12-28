import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserHistory, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import Alert from './components/layout/Alert';
import Footer from './components/layout/Footer';
import Sidebar from './components/sidebar/Sidebar';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { SET_ALERT } from './actions/types';

function App() {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  // Component Did Mount LifeCycle Method Replica
  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser]);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="d-flex align-items-stretch">
            <div id="sidebar">
              <Sidebar />
            </div>
            <div id="content">
              <Navbar />
              <Alert />
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route component={Routes} />
              </Switch>    
            </div>  
          </div>
          
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
