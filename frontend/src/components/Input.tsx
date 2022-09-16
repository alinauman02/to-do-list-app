import React from "react";

export default function Input(props: any) {
  return <input placeholder={props.sample} onChange={props.changeValue} />;
}
