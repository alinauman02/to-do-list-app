import React from "react";

export default function Input(props: any) {
  return (
    <input
      height={props.accept}
      width={props.width}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
}
