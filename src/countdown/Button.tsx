import React from "react";

interface ButtonProps {
  display: boolean;
  clickHandler: () => void;
  text: string;
}

export const Button: (props: ButtonProps) => JSX.Element = (props) => {
  return (
    <button disabled={!props.display} onClick={props.clickHandler}>
      {props.text}
    </button>
  );
};
