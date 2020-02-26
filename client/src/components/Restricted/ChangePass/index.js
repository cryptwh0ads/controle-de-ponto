import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Container } from 'semantic-ui-react'

import ActionCreators from '../../../store/actionCreators'

class ChangePass extends Component {
  // set the default state for this component
  state = {
    newPasswd: '',
    confirmNewPasswd: '',
    error: ''
  }
  /**
   * On mount this component, call the action 'reset'
   * to reset the older state to default state pre-established
   */
  componentDidMount() {
    this.props.reset()
  }

  /**
   * Method to get values from fields 'newPasswd' and
   * 'confirmPasswd', and send it to the state.
   */

  handleChange = fieldName => e => {
    this.setState({
      [fieldName]: e.target.value
    })
  }

  /**
   * It intermediates the action of saving,
   * before saving, check some things to validate,
   * if all conditions are valid, rescue process continues,
   * after redirect user to home page
   */

  handleSave = () => {
    if (this.state.newPasswd !== this.state.confirmNewPasswd) {
      this.setState({
        error: 'equal'
      })
    } else if (this.state.newPasswd.length < 6) {
      this.setState({
        error: 'length'
      })
    } else {
      this.setState({
        error: ''
      })
      this.props.save({
        passwd: this.state.newPasswd,
        id: this.props.auth.user.id
      })
      //redirect
      setTimeout(() => {
        this.props.history.push('/restricted')
      }, 1500)
    }
  }
  render() {
    return (
      <Container>
        <div>
          <h1>Alterar Senha</h1>
          {this.props.auth.saved && (
            <Segment color='green'>A senha foi alterada com sucesso.</Segment>
          )}
          {this.state.error !== '' ? (
            this.state.error === 'length' ? (
              <Segment color='red'>
                A senha precisa ter no minimo 6 caracteres.
              </Segment>
            ) : (
              <Segment color='red'>As senhas não são iguais.</Segment>
            )
          ) : null}
          {!this.props.auth.saved && (
            <Form>
              <Form.Field>
                <label>Nova Senha</label>
                <input
                  type='password'
                  value={this.state.newPasswd}
                  onChange={this.handleChange('newPasswd')}
                />
              </Form.Field>
              <Form.Field>
                <label>Confirmar Senha</label>
                <input
                  type='password'
                  value={this.state.confirmNewPasswd}
                  onChange={this.handleChange('confirmNewPasswd')}
                />
              </Form.Field>

              <Button onClick={this.handleSave} color='blue'>
                Salvar
              </Button>
            </Form>
          )}
        </div>
      </Container>
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
    save: user => dispatch(ActionCreators.updateProfileRequest(user)),
    reset: () => dispatch(ActionCreators.updateProfileReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass)
