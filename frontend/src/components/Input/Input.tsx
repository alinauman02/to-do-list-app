import "./Input.css";
import { ChangeEvent, MutableRefObject } from "react";

interface InputProps {
  name: string;
  value: string;
  type: "number" | "text" | "email" | "password";
  placeholder: string;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  onChange: (name: string, value: string) => void;
}

export function Input({
  name,
  value,
  type,
  placeholder,
  inputRef,
  onChange,
}: InputProps) {
  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.name, event.target.value);
  };

  return (
    <input
      className="input-todo"
      value={value}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={valueChangeHandler}
      ref={inputRef}
    />
  );
}
