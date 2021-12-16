import React from 'react';
import { useReducer, useState } from 'react';

const initialItem = [];

function reducerItem(items, action) {
  switch (action.type) {
    case 'Add Item': {
      return [
        ...items,
        {
          id: items.length,
          text: action.text,
        },
      ];
    }
    case 'Edit Item': {
      return items.map((item) => {
        if (item.id === action.task.id) {
          return action.task;
        }
        return item;
      });
    }
    case 'Delete item': {
      return items.filter((item) => item.id !== action.id);
    }

    default: {
      throw Error(`Error at: ${action.type}`);
    }
  }
}

export default function Home() {
  const [items, dispatch] = useReducer(reducerItem, initialItem);
  const [text, setText] = useState('');

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    dispatch({
      type: 'Add Item',
      text,
    });
  };
  const handleSubmitChange = (task) => {
    dispatch({
      type: 'Edit Item',
      task,
    });
  };
  const handleSubmitDelete = (taskId) => {
    dispatch({
      type: 'Delete item',
      id: taskId,
    });
  };

  return (
    <>
      <h1>Shopping we go!</h1>
      <form onSubmit={handleSubmitAdd}>
        <input
          type={text}
          placeholder="Food Search"
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add item!</button>
      </form>
      <ul>
        {items.map((item) => {
          return (
            <li>
              {item.text}
              <button onClick={handleSubmitChange}>Modify</button>
              <button onClick={() => handleSubmitDelete(item.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
