import { ReactElement } from "react";
import "./Alert.css";

interface AlertProps {
  type: "error" | "message";
  onClick?: () => void;
  children: ReactElement;
}

export default function Alert({ type, onClick, children }: AlertProps) {
  const classButton = type === "error" ? "error-box" : "msg-box";
  return (
    <button onClick={onClick} className={classButton}>
      {children}
    </button>
  );
}
