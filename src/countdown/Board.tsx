import React, { useState } from "react";
import { CardDeck } from "./CardDeck";
import "./card.scss";
import { LARGE_VALUES, LITTLE_VALUES } from "../cardvalues";
import { CardList } from "./CardList";
import { Target } from "./Target";
import { StartGame } from "./StartGame";

function generateTarget(): number {
  return Math.floor(Math.random() * 900) + 100;
}
// TODO - is this working as expected?
const shuffledArray: (arr: number[]) => number[] = (arr) =>
  arr.sort((a, b) => 0.5 - Math.random());

const isLittleValue: (n: number) => boolean = (n) => n >= 1 && n <= 10;

const removeElementFromArray: (n: number, values: number[]) => number[] = (
  n,
  values
) => {
  const index = values.indexOf(n);
  return values.filter((_, idx) => idx !== index);
};
export function Board() {
  const [largeValues, setLargeValues] = useState<number[]>(LARGE_VALUES);
  const [littleValues, setLittleValues] = useState<number[]>(
    shuffledArray(LITTLE_VALUES)
  );
  const [canStartGame, setCanStartGame] = useState<boolean>(false);
  const [target, setTarget] = useState<number | undefined>(undefined);
  const [cardFaceDown, setCardFaceDown] = useState<boolean>(true);

  const onStartGameClick: () => void = () => {
    setTarget(generateTarget());
    setCardFaceDown(false);
    setCanStartGame(false);
  };

  const cardDroppedCallback: (n: number) => void = (n) => {
    if (isLittleValue(n)) {
      setLittleValues((values) => removeElementFromArray(n, values));
    } else {
      setLargeValues((values) => removeElementFromArray(n, values));
    }
    console.log([...largeValues, ...littleValues].length);
    // TODO -> should this be a callback?
    if ([...largeValues, ...littleValues].length <= 19) {
      setCanStartGame(true);
    }
  };
  return (
    <>
      <>
        <Target value={target} />
        <CardList
          onCardDropped={cardDroppedCallback}
          cardFaceDown={cardFaceDown}
        />
        <StartGame
          canStartGame={canStartGame}
          onStartGameClick={onStartGameClick}
        />
      </>
      <div className="container">
        <CardDeck values={littleValues} numberType={"little"} key={1} />
        <CardDeck values={largeValues} numberType={"large"} key={2} />
      </div>
    </>
  );
}
