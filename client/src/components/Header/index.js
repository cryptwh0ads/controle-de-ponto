import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Dropdown } from 'semantic-ui-react'

import ActionCreators from '../../store/actionCreators'

import moment from 'moment'

const Header = props => {
  /**
   * Split the complete user's name
   * to set de Display name into navbar
   */
  const [DisplayName] = props.auth.user.name
    ? props.auth.user.name.split(' ')
    : ''
  /**
   * Verify the mode of navbar (user or admin) and
   * defines the options available for the pre-established mode
   *
   * If the user is admin, accrescent the option
   * to switch account type to use (user or admin)
   */
  if (props.mode === 'user' && props.auth.isAuth) {
    return (
      <Menu>
        <Menu.Item>MRS System</Menu.Item>
        <Menu.Item as={Link} to='/restricted'>
          Inicio
        </Menu.Item>
        <Menu.Item as={Link} to={`/restricted/hours/${moment().format('M')}`}>
          Horas
        </Menu.Item>
        <Menu.Item as={Link} to='/restricted/board'>
          Kanban
        </Menu.Item>
        <Menu.Menu position='right'>
          <Dropdown item text={DisplayName}>
            <Dropdown.Menu>
              {props.auth.user.role === 'admin' && (
                <Dropdown.Item as={Link} to='/admin/'>
                  Modo: Admin
                </Dropdown.Item>
              )}
              {
                // TODO: create 'My account page'
              }
              <Dropdown.Item disabled>Minha Conta</Dropdown.Item>
              <Dropdown.Item as={Link} to='/restricted/change-pass'>
                Mudar Senha
              </Dropdown.Item>
              <Dropdown.Item onClick={props.logout}>Sair</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    )
  } else if (props.mode === 'admin' && props.auth.isAuth) {
    return (
      <Menu>
        <Menu.Item>MRS System</Menu.Item>
        <Menu.Item as={Link} to='/admin'>
          Inicio
        </Menu.Item>
        <Menu.Item as={Link} to='/admin/users'>
          Usuários
        </Menu.Item>
        <Menu.Item as={Link} to={`/admin/hours/${moment().format('M')}`}>
          Horas
        </Menu.Item>
        <Menu.Menu position='right'>
          <Dropdown item text={DisplayName}>
            <Dropdown.Menu>
              {props.auth.user.role === 'admin' && (
                <Dropdown.Item as={Link} to='/restricted/'>
                  Modo: Usuário
                </Dropdown.Item>
              )}
              <Dropdown.Item disabled>My account</Dropdown.Item>
              <Dropdown.Item as={Link} to='/admin/change-pass'>
                Mudar Senha
              </Dropdown.Item>
              <Dropdown.Item onClick={props.logout}>Sair</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    )
  }
}
// Sends the external state to intern props of component
const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
// Dispatch action to reducers
const mapDispatchToProps = dispatch => {
  return {
    signin: (email, passwd) =>
      dispatch(ActionCreators.signinRequest(email, passwd)),
    logout: () => dispatch(ActionCreators.destroyAuthRequest())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
