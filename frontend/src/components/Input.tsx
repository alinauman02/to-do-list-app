import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  value: string;
  type: "number" | "text" | "email" | "password";
  placeholder: string;
  onChange: (name: string, value: string) => void;
}

export default function Input({
  name,
  value,
  type,
  placeholder,
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
    />
  );
}
