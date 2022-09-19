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
  const [Value, setValue] = useState<string>(value);
  return (
    <input
      value={Value}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e);
      }}
    />
  );
}
