import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import reducers from './reducers';
import thunk from 'redux-thunk';

import Dashboard from './containers/Dashboard';
import ExportPage from './containers/ExportPage';
import UpdatePage from './containers/UpdatePage';
import ComparisonPage from './containers/ComparisonPage';
import Header from './components/Header';
import './main.css';

const middleware = [thunk];

const store = createStore(reducers, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="automation">
        <Header />
        <div className="main-container">
          <Switch>
    				<Route exact path="/automation" component={Dashboard} />
    				<Route path="/automation/export" component={ExportPage} />
    				<Route path="/automation/update" component={UpdatePage} />
    				<Route path="/automation/compare" component={ComparisonPage} />
    				<Redirect
    					to={{
    						pathname: '/automation',
    					}}
    				/>
    			</Switch>
        </div>
      </div>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
)
