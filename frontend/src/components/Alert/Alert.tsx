import "./Alert.css";

interface AlertProps {
  type: "error" | "message";
  onFocusInput?: () => void;
  filter: string;
}

export default function Alert({ type, onFocusInput, filter }: AlertProps) {
  return (
    <div>
      {type === "error" && (
        <button className="error-box">
          <p className="error-text">
            <b> Wrong description!</b> Please enter valid todo
          </p>
        </button>
      )}
      {type === "message" && (
        <button onClick={onFocusInput} className="msg-box">
          <p className="msg-text">
            <b>
              No {filter === "PENDING" ? "Pending" : "Completed"} todos added
              yet!
            </b>
            Click here to add a new todo
          </p>
        </button>
      )}
    </div>
  );
}
