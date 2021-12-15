import React from 'react';
import { useReducer } from 'react';

const initialItem = [];

function reducerItem(items, action) {
  switch (action.type) {
    case 'Add Item': {
      return [
        ...items,
        {
          id: action.id,
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
      return items.filter((item) => {
        item.id !== action.id;
      });
    }
    default: {
      throw Error(`Error at: ${action.type}`);
    }
  }
}

export default function Home() {
  const [item, dispatch] = useReducer(reducerItem, initialItem);

  return <div></div>;
}
