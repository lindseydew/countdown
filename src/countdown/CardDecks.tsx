import React from "react";
import { CardDeck } from "./CardDeck";
import "./card.scss";
import { LARGE_VALUES, LITTLE_VALUES } from "../cardvalues";

const shuffledArray: (arr: number[]) => number[] = (arr) =>
  arr.sort((a, b) => 0.5 - Math.random());

export const CardDecks: () => JSX.Element = () => {
  const largeValues = shuffledArray(LARGE_VALUES);
  const littleValues = shuffledArray(LITTLE_VALUES);
  return (
    <div className="container">
      <CardDeck values={largeValues} />
      <CardDeck values={littleValues} />
    </div>
  );
};
