import React, { Component } from 'react'
import { Segment, Form, Button, Container } from 'semantic-ui-react'

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import ActionCreators from '../../../store/actionCreators'

class Register extends Component {
  state = {
    passwd: '',
    confirmPasswd: '',
    name: '',
    email_emp: '',
    username: '',
    role: '',
    ci: '',
    absent: '',
    error: ''
  }

  componentDidMount() {
    this.props.reset()
  }

  handleChange = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value
    })
  }

  handleSave = () => {
    if (this.state.passwd !== this.state.confirmPasswd) {
      this.setState({
        error: 'equal'
      })
    } else if (this.state.passwd.length < 6) {
      this.setState({
        error: 'length'
      })
    } else {
      this.setState({
        error: ''
      })
      this.props.save({
        name: this.state.name,
        username: this.state.username,
        email_emp: this.state.email_emp,
        role: this.state.role,
        passwd: this.state.passwd,
        ci: this.state.ci,
        absent: '1'
      })
      setTimeout(() => {
        return <Redirect to='/admin/users' />
      }, 1500)
    }
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
          {this.props.auth.saved && (
            <Segment color='green'>Prestador registrado com sucesso</Segment>
          )}
          {this.state.error !== '' ? (
            this.state.error === 'length' ? (
              <Segment color='red'>
                A senha precisa ter no minímo 6 caracteres.
              </Segment>
            ) : (
              <Segment color='red'>As senhas precisam ser iguais.</Segment>
            )
          ) : null}
          {!this.props.auth.saved && (
            <Form>
              <Form.Field>
                <label>CI</label>
                <input
                  type='text'
                  value={this.state.ci}
                  onChange={this.handleChange('ci')}
                  onKeyDown={e => this.something(e)}
                />
              </Form.Field>
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
                  <option value='user'>Usuário</option>
                  <option value='admin'>Administrador</option>
                </select>
              </Form.Field>
              <Form.Field>
                <label>Senha</label>
                <input
                  type='password'
                  value={this.state.passwd}
                  onChange={this.handleChange('passwd')}
                />
              </Form.Field>
              <Form.Field>
                <label>Confirmar Senha</label>
                <input
                  type='password'
                  value={this.state.confirmPasswd}
                  onChange={this.handleChange('confirmPasswd')}
                  onKeyDown={e => this.something(e)}
                />
              </Form.Field>

              <Button onClick={this.handleSave} type='button' color='green'>
                Registrar
              </Button>
            </Form>
          )}
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: user => dispatch(ActionCreators.createProfileRequest(user)),
    reset: () => dispatch(ActionCreators.createProfileReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
