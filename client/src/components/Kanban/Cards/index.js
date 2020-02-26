import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Typography } from '@material-ui/core'

import { CardContainer, CardDragging, CardDropping, CardRotate } from './styles'

function Cards({ content, id, index }) {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided, snapshot) => (
        <CardDragging isDragging={snapshot.isDragging}>
          <CardContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardRotate isDragging={snapshot.isDragging}>
              <CardDropping isDropping={snapshot.isDropAnimating}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography gutterBottom>{content}</Typography>
                  </CardContent>
                </Card>
              </CardDropping>
            </CardRotate>
          </CardContainer>
        </CardDragging>
      )}
    </Draggable>
  )
}

export default Cards
