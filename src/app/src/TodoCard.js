import React from 'react';

function TodoCard({ todo }) {
  return (
    <div style={{ backgroundColor: 'lightgrey', padding: '10px', marginBottom: '10px' }}>
      <h3>{todo.title}</h3>
    </div>
  );
}

export default TodoCard;
