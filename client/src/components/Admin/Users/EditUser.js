import React, { Component } from 'react'
import ActionCreators from '../../../store/actionCreators'
import { connect } from 'react-redux'

import { Button, Form, Segment, Container, Popup } from 'semantic-ui-react'

const timeoutLength = 2500
class EditUser extends Component {
  //Controlled component

  state = {
    name: '',
    username: '',
    email_emp: '',
    role: '',
    error: '',
    isOpen: false
  }

  componentWillUnmount() {
    this.props.reset()
  }

  componentDidMount() {
    this.props.load(this.props.match.params.id)
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (
      newProps.users &&
      newProps.users.user &&
      (prevState.name === undefined || prevState.name === '')
    ) {
      const user = {}
      const u = newProps.users.user

      if (u.name !== prevState.name) {
        user.name = u.name
      }

      if (u.username !== prevState.username) {
        user.username = u.username
      }

      if (u.role !== prevState.role) {
        user.role = u.role
      }
      if (u.absent !== prevState.absent) {
        user.absent = u.absent
      }
      if (u.email_emp !== prevState.email_emp) {
        user.email_emp = u.email_emp
      }

      return user
    }
    return null
  }

  handleChange = fieldName => event => {
    this.setState({
      [fieldName]: event.target.value
    })
  }

  handleSave = () => {
    this.props.save({
      id: this.props.match.params.id,
      name: this.state.name,
      username: this.state.username,
      email_emp: this.state.email_emp,
      role: this.state.role,
      absent: this.state.absent
    })

    //redirect
    setTimeout(() => {
      this.props.history.push('/admin/users')
    }, 1500)
  }

  handleSaveReset = () => {
    this.props.save({
      id: this.props.match.params.id,
      passwd: '123mudar!'
    })

    //redirect
    setTimeout(() => {
      this.props.history.push('/admin/users')
    }, 1500)
  }

  handleOpen = () => {
    this.setState({ isOpen: true })

    this.timeout = setTimeout(() => {
      this.setState({ isOpen: false })
    }, timeoutLength)
  }

  handleClose = () => {
    this.setState({ isOpen: false })
    clearTimeout(this.timeout)
  }

  something = event => {
    if (event.keyCode === 13) {
      this.handleSave()
    }
  }
  render() {
    return (
      <Container>
        <div>
          <h1>Editar Informações</h1>
          {this.props.users.saved && (
            <Segment color='green'>As alterações foram salvas.</Segment>
          )}
          {!this.props.users.saved && (
            <Form>
              <Form.Field>
                <label>Nome</label>
                <input
                  type='text'
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  onKeyDown={e => this.something(e)}
                />
              </Form.Field>
              <Form.Field>
                <label>Usuário</label>
                <input
                  type='text'
                  value={this.state.username}
                  onChange={this.handleChange('username')}
                  onKeyDown={e => this.something(e)}
                />
              </Form.Field>
              <Form.Field>
                <label>E-mail Empresarial</label>
                <input
                  type='email'
                  value={this.state.email_emp}
                  onChange={this.handleChange('email_emp')}
                  onKeyDown={e => this.something(e)}
                />
              </Form.Field>
              <Form.Field>
                <label>Acesso</label>
                <select
                  value={this.state.role}
                  onChange={this.handleChange('role')}
                >
                  <option value='admin'>Administrator</option>
                  <option value='user'>User</option>
                </select>
              </Form.Field>
              <Form.Field>
                <label>Ausente</label>
                <select
                  value={this.state.absent}
                  onChange={this.handleChange('absent')}
                >
                  <option value='1'>Ausente</option>
                  <option value='0'>Presente</option>
                </select>
              </Form.Field>
              <Form.Field>
                <label>Resetar Senha</label>
                <Button
                  onClick={this.handleSaveReset}
                  type='button'
                  color='red'
                  floated='left'
                >
                  Resetar
                </Button>
                <Popup
                  trigger={<Button content='?' color='twitter' size='mini' />}
                  content={`Senha Padrão: 123mudar!`}
                  on='click'
                  open={this.state.isOpen}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  position='right center'
                />
              </Form.Field>
              <Form.Field>
                <label>Salvar alterações</label>
                <Button
                  onClick={this.handleSave}
                  type='button'
                  color='green'
                  floated='left'
                >
                  Salvar
                </Button>
              </Form.Field>
            </Form>
          )}
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: user => dispatch(ActionCreators.updateUserRequest(user)),
    reset: () => dispatch(ActionCreators.updateUserReset()),
    load: id => dispatch(ActionCreators.getUserRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
