import React, { useEffect } from "react";
import { Card } from "./Card";
import "./card.scss";

interface CardDeckProps {
  values: number[];
}

export const CardDeck: (props: CardDeckProps) => JSX.Element = (props) => {
  const dragStart = (e: React.DragEvent<HTMLDivElement>, value: number) => {
    e.dataTransfer.setData("value", value.toString());
  };

  useEffect(() => {}, [props.values]);
  return (
    <div className="card-deck-stack">
      {props.values.map((value, index) => {
        return (
          <div onDragStart={(e) => dragStart(e, value)} draggable>
            <Card facedown={true} value={value} key={index} />
          </div>
        );
      })}
    </div>
  );
};
