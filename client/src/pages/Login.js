import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Form, Grid, Image, Segment, Message } from 'semantic-ui-react'

import ActionCreator from '../store/actionCreators'

import Logo from '../assets/logo.png'

class Login extends Component {
  //  Set default state to this component
  state = {
    form: {
      username: '',
      passwd: ''
    },
    passVisible: false
  }

  /**
   * Method to get values from fields 'username' and 'passwd',
   * and send it to the state
   */

  handleChange = fieldName => e => {
    const form = {
      ...this.state.form
    }
    form[fieldName] = e.target.value
    this.setState({ form })
  }

  /**
   * Call the login action sending username and passwd (hashed),
   * forcing lower case to username
   */

  login = () => {
    const { username, passwd } = this.state.form
    this.props.login(username.toLowerCase(), passwd)
  }

  /**
   * Run action login on key 'Enter' is pressed
   */

  keyPress = event => {
    if (event.keyCode === 13) {
      this.login()
    }
  }

  /**
   * If user is authenticated redirect to page 'restricted',
   * else show the login form to input your username and pass.
   */
  render() {
    if (this.props.auth.isAuth) {
      return <Redirect to='/restricted' />
    }
    return (
      <div>
        <Grid
          textAlign='center'
          style={{ height: '70vh' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <div style={{ height: '30vh' }}></div>
            <Form size='medium'>
              <Segment stacked>
                <div style={{ marginLeft: '12%', marginBottom: 22 }}>
                  <Image src={Logo} size='medium' />
                </div>
                <Form.Field>
                  <Form.Input
                    width={14}
                    icon='user'
                    iconPosition='left'
                    placeholder='Usuário'
                    value={this.state.form.username}
                    onChange={this.handleChange('username')}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Group>
                    <Form.Input
                      width={14}
                      icon='lock'
                      iconPosition='left'
                      placeholder='Senha'
                      type={this.state.passVisible ? 'text' : 'password'}
                      value={this.state.form.passwd}
                      onChange={this.handleChange('passwd')}
                      onKeyDown={e => this.keyPress(e)}
                    />
                    <Button
                      color='inherit'
                      type='button'
                      icon={this.state.passVisible ? 'eye slash' : 'eye'}
                      onClick={() =>
                        this.setState({
                          passVisible: !this.state.passVisible
                        })
                      }
                    />
                  </Form.Group>
                </Form.Field>
                <Button
                  color='blue'
                  fluid
                  size='large'
                  onClick={this.login}
                  type='button'
                >
                  Login
                </Button>
              </Segment>
            </Form>
            {this.props.auth.error && (
              <Message color='red'>Erro ao entrar, verifique os dados!</Message>
            )}
          </Grid.Column>
        </Grid>
      </div>
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
    login: (username, passwd) =>
      dispatch(ActionCreator.signinRequest(username, passwd)),
    logout: () => dispatch(ActionCreator.destroyAuthRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
