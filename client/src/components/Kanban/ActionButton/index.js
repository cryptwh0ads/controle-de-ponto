import React, { Component } from 'react'
import { addList, addCard } from '../../../store/ducks/kanban/actions'

import TextArea from 'react-textarea-autosize'

import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import { connect } from 'react-redux'
import { Card, Button, CardContent } from '@material-ui/core'

import { FormButtonGroup, OpenFormButtonGroup } from './styles'

// import { Container } from './styles';

class ActionButton extends Component {
  state = {
    formOpen: false,
    content: ''
  }

  openForm = () => {
    this.setState({
      formOpen: true
    })
  }
  closeForm = () => {
    this.setState({
      formOpen: false,
      content: ''
    })
  }
  handleInputText = e => {
    this.setState({
      content: e.target.value
    })
  }
  handleAddList = () => {
    const { dispatch } = this.props
    const { content } = this.state
    if (content) {
      dispatch(addList(content))
    }

    return
  }
  handleAddCard = () => {
    const { dispatch, listID } = this.props
    const { content } = this.state
    if (content) {
      dispatch(addCard(listID, content))
    }

    return
  }
  renderAddButton = () => {
    const { list } = this.props

    // State condition
    const buttonText = list ? 'Adicionar outra lista' : 'Adicionar outro card'
    const buttonTextOpacity = list ? 1 : 0.5
    const buttonTextColor = list ? 'white' : 'inherit'
    const buttonTextBg = list ? 'rgba(0,0,0,.15)' : 'inherit'

    return (
      <OpenFormButtonGroup
        onClick={this.openForm}
        style={{
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBg
        }}
      >
        <AddIcon />
        <p>{buttonText}</p>
      </OpenFormButtonGroup>
    )
  }
  renderForm = () => {
    const { list } = this.props

    const placeHolder = list
      ? 'O melhor titulo para a lista aqui...'
      : 'O melhor titulo para o card aqui...'

    const buttonTitle = list ? 'Adicionar lista' : 'Adicionar card'

    return (
      <div
        style={{
          minHeight: 80,
          minWidth: 272,
          padding: '6px 8px 2px'
        }}
      >
        <Card elevation={2}>
          <CardContent>
            <TextArea
              placeholder={placeHolder}
              autoFocus
              value={this.state.content}
              onChange={this.handleInputText}
              onBlur={this.closeForm}
              style={{
                resize: 'none',
                overflow: 'hidden',
                width: '100%',
                outline: 'none',
                border: 'none'
              }}
            />
          </CardContent>
        </Card>
        <FormButtonGroup>
          <Button
            onMouseDown={list ? this.handleAddList : this.handleAddCard}
            variant='contained'
            style={{ color: 'white', backgroundColor: '#5aac44' }}
          >
            {buttonTitle}
          </Button>
          <CloseIcon style={{ marginLeft: 8, cursor: 'pointer' }} />
        </FormButtonGroup>
      </div>
    )
  }

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton()
  }
}

export default connect()(ActionButton)
