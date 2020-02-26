import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'

import EditHour from '../../components/Admin/Hours/EditHour'
import EditUser from '../../components/Admin/Users/EditUser'
import Hours from '../../components/Admin/Hours'
import Register from '../../components/Admin/Users/RegisterUser'
import Users from '../../components/Admin/Users'
import Header from '../../components/Header'
import ChangePass from '../../components/Restricted/ChangePass'
import Kanban from '../../components/Kanban/index'
import PageNotFound from '../PageNotFound'
import Home from '../../components/Admin'

// Render the home page
const Admin = props => {
  /**
   * Check if the users is authenticated and
   * if the user is Admin, else redirect to appropriate page
   */
  if (!props.auth.isAuth) {
    return <Redirect to='/' />
  }
  if (props.auth.user.role !== 'admin') {
    return <Redirect to='/restricted' />
  }
  /**
   * Create the routes to sub-pages and
   * set Header's component to admin mode
   */
  return (
    <div>
      <Header mode='admin' />
      <Switch>
        <Route path={`${props.match.path}/`} exact component={Home} />
        <Route
          path={`${props.match.path}/users/:id/edit`}
          exact
          component={EditUser}
        />
        <Route path={`${props.match.path}/users`} exact component={Users} />
        <Route
          path={`${props.match.path}/users/register`}
          component={Register}
        />
        <Route
          path={`${props.match.path}/change-pass`}
          component={ChangePass}
        />
        <Route
          path={`${props.match.path}/hours/:id/edit`}
          exact
          component={EditHour}
        />
        <Route
          path={`${props.match.path}/hours/:page?`}
          exact
          component={Hours}
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

export default connect(mapStateToProps)(Admin)
