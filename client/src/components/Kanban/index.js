import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { sort } from '../../store/ducks/kanban/actions'
import List from './List'
import ActionButton from './ActionButton'

import styled from 'styled-components'

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`

class Kanban extends Component {
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    )
  }
  render() {
    const { lists } = this.props
    const { name } = this.props.auth.user
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div>
          <h1>Bem-Vindo, {name}</h1>
          <Droppable droppableId='all-lists' direction='horizontal' type='list'>
            {provided => (
              <ListContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map((list, index) => (
                  <List
                    key={list.id}
                    listID={list.id}
                    title={list.title}
                    cards={list.cards}
                    index={index}
                  />
                ))}
                {provided.placeholder}
                <ActionButton list />
              </ListContainer>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    )
  }
}

const mapStateToProps = state => ({
  lists: state.kanban,
  auth: state.auth
})

export default connect(mapStateToProps)(Kanban)
