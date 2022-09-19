import React, { ChangeEvent } from "react";
import { useState } from "react";
interface InputProps {
  name: string;
  value: string;
  type: "number" | "text" | "email" | "password";
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  value,
  type,
  placeholder,
  onChange,
}: InputProps) {
  const [currentValue, setCurrentValue] = useState<string>(value);

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
    onChange(event);
  };

  return (
    <input
      value={currentValue}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={valueChangeHandler}
    />
  );
}
