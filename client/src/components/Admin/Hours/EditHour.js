import React, { Component } from 'react'
import ActionCreators from '../../../store/actionCreators'
import { connect } from 'react-redux'
import InputMask from 'react-input-mask'

import { Button, Form, Segment, Container } from 'semantic-ui-react'

class EditUser extends Component {
  state = {
    entrance_1: '',
    exit_1: '',
    entrance_2: '',
    exit_2: '',
    error: ''
  }

  componentWillUnmount() {
    this.props.reset()
  }
  componentDidMount() {
    this.props.load(this.props.match.params.id)
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (
      newProps.hours &&
      newProps.hours.hour &&
      (prevState.entrance_1 === undefined || prevState.entrance_1 === '')
    ) {
      const hour = {}
      const h = newProps.hours.hour

      if (h.entrance_1 !== prevState.entrance_1) {
        hour.entrance_1 = h.entrance_1
      }

      if (h.exit_1 !== prevState.exit_1) {
        hour.exit_1 = h.exit_1
      }

      if (h.entrance_2 !== prevState.entrance_2) {
        hour.entrance_2 = h.entrance_2
      }

      if (h.exit_2 !== prevState.exit_2) {
        hour.exit_2 = h.exit_2
      }

      return hour
    }
    return null
  }

  handleChange = fieldName => event => {
    this.setState({
      [fieldName]: event.target.value
    })
  }

  keyPress = event => {
    if (event.keyCode === 13) {
      this.handleSave()
    }
  }

  handleSave = () => {
    if (
      this.state.entrance_1 !== '__:__' &&
      this.state.exit_1 !== '__:__' &&
      this.state.entrance_2 !== '__:__' &&
      this.state.exit_2 !== '__:__'
    ) {
      this.props.save({
        id: this.props.match.params.id,
        entrance_1: this.state.entrance_1,
        exit_1: this.state.exit_1,
        entrance_2: this.state.entrance_2,
        exit_2: this.state.exit_2
      })
      //redirect
      setTimeout(() => {
        this.props.history.push('/admin/hours', {
          prevUser: this.props.hours.currentUser[0].id
        })
      }, 1500)
    }
  }
  render() {
    return (
      <Container>
        <div>
          <h1>Editar Horas</h1>
          {this.props.hours.saved && (
            <Segment color='green'>As alterações foram salvas.</Segment>
          )}
          {!this.props.hours.saved && (
            <Form>
              <Form.Field>
                <label>Entrada 1</label>
                <InputMask
                  mask='99:99'
                  type='text'
                  value={this.state.entrance_1}
                  onChange={this.handleChange('entrance_1')}
                  onKeyDown={e => this.keyPress(e)}
                />
              </Form.Field>
              <Form.Field>
                <label>Saida 1</label>
                <InputMask
                  mask='99:99'
                  type='text'
                  value={this.state.exit_1}
                  onChange={this.handleChange('exit_1')}
                  onKeyDown={e => this.keyPress(e)}
                />
              </Form.Field>
              <Form.Field>
                <label>Entrada 2</label>
                <InputMask
                  mask='99:99'
                  type='text'
                  value={this.state.entrance_2}
                  onChange={this.handleChange('entrance_2')}
                  onKeyDown={e => this.keyPress(e)}
                />
              </Form.Field>
              <Form.Field>
                <label>Saida 2</label>
                <InputMask
                  mask='99:99'
                  type='text'
                  value={this.state.exit_2}
                  onChange={this.handleChange('exit_2')}
                  onKeyDown={e => this.keyPress(e)}
                />
              </Form.Field>

              <Button
                onClick={
                  this.state.entrance_1 !== '__:__'
                    ? this.state.exit_1 !== '__:__'
                      ? this.state.entrance_2 !== '__:__'
                        ? this.state.exit_2 !== '__:__'
                          ? this.handleSave
                          : null
                        : null
                      : null
                    : null
                }
                type='button'
                color='blue'
              >
                Salvar
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
    hours: state.hours
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: hour => dispatch(ActionCreators.updateHourRequest(hour)),
    reset: () => dispatch(ActionCreators.updateHourReset()),
    load: id => dispatch(ActionCreators.getHourRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
