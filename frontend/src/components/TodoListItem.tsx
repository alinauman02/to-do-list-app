import { IconDelete } from "./Icons/IconDelete";
export default function TodoListItem(props: any) {
  return (
    <li>
      <div className="list-item flex-container">
        <p className="list-item-p">{props.todo.description}</p>
        <button className="delete-button button">
          <IconDelete />
        </button>
      </div>
    </li>
  );
}
