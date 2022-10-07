import { ChangeEvent, MutableRefObject } from "react";

import "./Input.css";

interface InputProps {
  name: string;
  value: string;
  type: "number" | "text" | "email" | "password";
  placeholder: string;
  onChange: (name: string, value: string) => void;
  inputRef: MutableRefObject<HTMLInputElement | null>;
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
