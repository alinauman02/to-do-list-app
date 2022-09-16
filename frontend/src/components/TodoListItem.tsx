import React from "react";

export default function TodoListItem(props: any) {
  return (
    <tr>
      <td>
        <p>{props.todo.description}</p>
      </td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  );
}
