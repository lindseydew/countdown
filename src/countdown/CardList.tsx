import React from "react";
import { CardPlaceholder, Card } from "./Card";
import "./card.scss";

interface CardListProps {
  onCardDropped: (n: number) => void;
  cardFaceDown: boolean;
  values: number[];
}

export function CardList(props: CardListProps): JSX.Element {
  const drop: (e: React.DragEvent<HTMLDivElement>) => void = (e) => {
    const value = Number(e.dataTransfer.getData("value"));
    props.onCardDropped(value);
  };

  const allowDrop: (e: React.DragEvent<HTMLDivElement>) => void = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      {props.values.map((v, index) => (
        <div data-cy={`card-selected-${index}`}>
          <Card facedown={props.cardFaceDown} value={v} key={index} />
        </div>
      ))}
      {Array(6 - props.values.length)
        .fill(0)
        .map((_, index) => {
          return (
            <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}>
              <CardPlaceholder key={index} index={index} />
            </div>
          );
        })}
    </div>
  );
}
