import React, { useState } from "react";
import { CardPlaceholder, Card, CardProps } from "./Card";
import "./card.scss";

interface CardListProps {
  onCardDropped: (n: number) => void;
  cardFaceDown: boolean;
}

export function CardList(props: CardListProps): JSX.Element {
  const [cards, setCards] = useState<CardProps[]>([]);

  const drop: (e: React.DragEvent<HTMLDivElement>) => void = (e) => {
    const value = Number(e.dataTransfer.getData("value"));
    setCards((cards) => [...cards, { value: value, facedown: true }]);
    props.onCardDropped(value);
  };

  const allowDrop: (e: React.DragEvent<HTMLDivElement>) => void = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      {cards.map((c, index) => (
        <Card facedown={props.cardFaceDown} value={c.value} key={index} />
      ))}

      {Array(6 - cards.length)
        .fill(0)
        .map((_, index) => {
          return (
            <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}>
              <CardPlaceholder key={index} />
            </div>
          );
        })}
    </div>
  );
}
