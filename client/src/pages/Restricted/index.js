import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'

import Header from '../../components/Header'
import ChangePass from '../../components/Restricted/ChangePass'
import Home from '../../components/Restricted/'
import Hours from '../../components/Restricted/Hours'
import Kanban from '../../components/Kanban'
import PageNotFound from '../PageNotFound'

const Restricted = props => {
  /**
   * Pre load the page,
   * if user is not auth, send it to login page
   */
  if (props.auth.isSigningin) {
    return <p>Loading...</p>
  }
  if (!props.auth.isAuth) {
    return <Redirect to='/' />
  }

  /**
   * Create the routes to sub-pages and
   * set Header's component to user mode
   */
  return (
    <div>
      <Header mode='user' />
      <Switch>
        <Route path={`${props.match.path}/`} exact component={Home} />
        <Route path={`${props.match.path}/hours/:page?`} component={Hours} />
        <Route
          path={`${props.match.path}/change-pass`}
          component={ChangePass}
        />
        <Route path={`${props.match.path}/board`} exact component={Kanban} />

        <Route path='*' component={PageNotFound} />
      </Switch>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Restricted)
