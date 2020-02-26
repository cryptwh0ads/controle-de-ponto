import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import Cards from '../Cards'
import ActionButton from '../ActionButton'

import { ListContainer } from './styles'

const List = ({ title, cards, listID, index }) => {
  return (
    <Draggable draggableId={String(listID)} index={index}>
      {provided => (
        <ListContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listID)} type='card'>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h4>{title}</h4>
                {cards.map((card, index) => (
                  <Cards
                    key={card.id}
                    content={card.content}
                    index={index}
                    id={card.id}
                  />
                ))}
                {provided.placeholder}
                <ActionButton listID={listID} />
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  )
}

export default List
