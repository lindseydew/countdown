import React from "react";
import "./card.scss";

interface CardProps {
  facedown: boolean;
  value?: number;
}

export const Card: (props: CardProps) => JSX.Element = (props) => {
  return (
    <div className={"card " + (props.facedown ? "facedown" : "")}>
      {props.facedown ? props.value : props.value}
    </div>
  );
};
