import React from "react";
import "./card.scss";

export type NumberType = "large" | "little";
export interface CardProps {
  facedown: boolean;
  value: number;
}

export const Card: (props: CardProps) => JSX.Element = (props) => {
  const numberType: NumberType = props.value <= 10 ? "little" : "large";
  return (
    <div className={"card " + (props.facedown ? `facedown-${numberType}` : "")}>
      {props.facedown ? `${numberType}` : props.value}
    </div>
  );
};

export const CardPlaceholder: () => JSX.Element = () => {
  return <div className="card"></div>;
};
