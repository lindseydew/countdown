import React, { useState } from "react";
import { CardDeck } from "./CardDeck";
import "./card.scss";
import { LARGE_VALUES, LITTLE_VALUES } from "../cardvalues";
import { CardList } from "./CardList";

const shuffledArray: (arr: number[]) => number[] = (arr) =>
  arr.sort((a, b) => 0.5 - Math.random());

const isLittleValue: (n: number) => boolean = (n) => n >= 1 && n <= 10;

const removeElementFromArray: (n: number, values: number[]) => number[] = (
  n,
  values
) => {
  const index = values.indexOf(n);
  if (index > -1) values.splice(index, 1);
  return values;
};
export function Board() {
  const [largeValues, setLargeValues] = useState<number[]>(
    shuffledArray(LARGE_VALUES)
  );
  const [littleValues, setLittleValues] = useState<number[]>(
    shuffledArray(LITTLE_VALUES)
  );

  const cardDroppedCallback: (n: number) => void = (n) => {
    console.log("card dropped callback");
    if (isLittleValue(n)) {
      setLittleValues((values) => removeElementFromArray(n, values));
    } else {
      console.log(largeValues);
      setLargeValues((values) => removeElementFromArray(n, values));
      console.log(largeValues);
    }
  };
  return (
    <>
      <CardList onCardDropped={cardDroppedCallback} />
      <div className="container">
        <CardDeck values={largeValues} key={1} />
        <CardDeck values={littleValues} key={2} />
      </div>
    </>
  );
}
