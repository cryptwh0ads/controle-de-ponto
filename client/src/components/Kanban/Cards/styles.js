import styled, { css } from 'styled-components'

export const CardContainer = styled.div`
  margin-bottom: 8px;
`

export const CardDragging = styled.div`
  ${props =>
    props.isDragging &&
    css`
      border: 2px dashed rgba(0, 0, 0, 0.2);
      height: 65px;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
      cursor: grabbing;
    `};
`

export const CardDropping = styled.div`
  ${props =>
    props.isDropping &&
    css`
      opacity: 0.4;
    `}
`

export const CardRotate = styled.div`
  ${props =>
    props.isDragging &&
    css`
      transform: rotate(2deg);
    `}
`
