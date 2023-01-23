import React from "react";
import { Card } from "./Card";
import "./card.scss";

interface CardDeckProps {
  values: number[];
}

export const CardDeck: (props: CardDeckProps) => JSX.Element = (props) => {
  return (
    <div className="card-deck-stack">
      {props.values.map((v) => {
        return <Card facedown={true} value={v} />;
      })}
    </div>
  );
};
