import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './app.css'
//import reducers from './reducers/reducers'
import Header from './components/Header'
import ExportPage from './containers/ExportPage'
import UpdatePage from './containers/UpdatePage'
import ComparisonPage from './containers/ComparisonPage'

// let store = createStore(
//     reducers,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

ReactDOM.render(
    //<Provider store={store}>
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={ ExportPage } />
                    <Route path="/update" component={ UpdatePage } />
                    <Route path="/compare" component={ ComparisonPage } />
                </Switch>
            </div>
        </Router>
    //</Provider>
    ,
    document.getElementById('root')
)
