import { IconDelete } from "./Icons/IconDelete";
export default function TodoListItem(props: any) {
  return (
    <div className="list-item flex-container">
      <p className="list-item-p">{props.todo.description}</p>
      <button className="button-icon">
        <IconDelete />
      </button>
    </div>
  );
}
