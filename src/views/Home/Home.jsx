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
        if (item.id === action.id) {
          item.text = action.text;
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
  const [edititing, setEditing] = useState(false);
  const [taskId, setTaskId] = useState('');

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    setText('');
    dispatch({
      type: 'Add Item',
      text,
    });
  };
  const handleSubmitChange = (e) => {
    e.preventDefault();
    setEditing(false);
    setText('');
    dispatch({
      type: 'Edit Item',
      id: taskId,
      text,
    });
  };
  const handleSubmitDelete = (taskId) => {
    dispatch({
      type: 'Delete item',
      id: taskId,
    });
  };
  const handleModify = (taskText, taskId) => {
    setEditing(true);
    setText(taskText);
    setTaskId(taskId);
  };

  return (
    <>
      <h1>Shopping we go!</h1>
      <form
        onSubmit={edititing ? (e) => handleSubmitChange(e) : handleSubmitAdd}
      >
        <input
          value={text}
          type="text"
          placeholder="Food Search"
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">{edititing ? 'Save Item' : 'Add to Cart'}</button>
      </form>
      <ul>
        {items.map((item) => {
          return (
            <li>
              {item.text}
              <button onClick={() => handleModify(item.text, item.id)}>
                Modify
              </button>
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
