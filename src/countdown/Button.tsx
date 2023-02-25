import React from "react";

interface ButtonProps {
  display: boolean;
  clickHandler: () => void;
  text: string;
  id: string;
}

export const Button: (props: ButtonProps) => JSX.Element = (props) => {
  return (
    <button
      disabled={!props.display}
      onClick={props.clickHandler}
      data-cy={props.id}
    >
      {props.text}
    </button>
  );
};
