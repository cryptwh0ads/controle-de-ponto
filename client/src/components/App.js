import React, { Component } from 'react'

/**
 * Import basic modules for the redux application work
 */

import store from '../store'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

/**
 * The import pages that will be used for the application
 */

import Restricted from '../pages/Restricted'
import Admin from '../pages/Admin'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'

/**
 * default class for the application works App()
 * Provider, provides global states for the rest of the application
 * The routes used for the application
 */
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/admin' component={Admin} />
            <Route path='/restricted' component={Restricted} />
            {/* If page not exists, show this component to user */}
            <Route path='*' component={PageNotFound} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
