import React from 'react';
import { useDrag } from 'react-dnd';

function Ship() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={require('../assets/images/cards/english/ship.png')}
      alt="Ship Card"
      id="shipcard"
    />
  );
}

export default Ship;
