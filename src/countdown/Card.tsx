import React from "react";
import "./card.scss";

export interface CardProps {
  facedown: boolean;
  value: number;
}

export const Card: (props: CardProps) => JSX.Element = (props) => {
  return (
    <div className={"card " + (props.facedown ? "facedown" : "")}>
      {props.value}
    </div>
  );
};

export const CardPlaceholder: () => JSX.Element = () => {
  return <div className="card"></div>;
};
