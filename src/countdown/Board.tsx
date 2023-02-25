import React, { useEffect, useState } from "react";
import { CardDeck } from "./CardDeck";
import "./card.scss";
import { LARGE_VALUES, LITTLE_VALUES } from "../cardvalues";
import { CardList } from "./CardList";
import { Target } from "./Target";
import { ShowSolutions } from "./ShowSolutions";
import { Solver } from "../solver/Solver";
import { Button } from "./Button";

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
  const index = values.lastIndexOf(n);
  return values.filter((_, idx) => idx !== index);
};

enum GameState {
  setUp,
  readyToPlay,
  playing,
  finished,
}
export function Board() {
  const [largeValues, setLargeValues] = useState<number[]>(LARGE_VALUES);
  const [littleValues, setLittleValues] = useState<number[]>(
    shuffledArray(LITTLE_VALUES)
  );
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [target, setTarget] = useState<number | undefined>(undefined);
  const [gameState, setGameState] = useState<GameState>(GameState.setUp);
  const [solver, setSolver] = useState<Solver | undefined>(undefined);

  const onStartGameClick: () => void = () => {
    setTarget(generateTarget());
    setGameState(GameState.playing);
  };

  const onShowSolutionsClick: () => void = () => {
    if (target !== undefined) {
      setSolver(new Solver(target, selectedValues));
      setGameState(GameState.finished);
    }
    // else error?
  };
  const cardDroppedCallback: (n: number) => void = (n) => {
    if (gameState === GameState.setUp) {
      if (isLittleValue(n)) {
        setLittleValues((values) => removeElementFromArray(n, values));
      } else {
        setLargeValues((values) => removeElementFromArray(n, values));
      }
      // don't have call backs on setState hook -> use useEffect instead
      setSelectedValues((values) => [...values, n]);
    }
  };

  useEffect(() => {
    if (selectedValues.length === 6 && gameState === GameState.setUp) {
      setGameState(GameState.readyToPlay);
    }
  }, [selectedValues]);

  return (
    <>
      <>
        <Target value={target} />
        <CardList
          onCardDropped={cardDroppedCallback}
          cardFaceDown={
            gameState === GameState.setUp || gameState === GameState.readyToPlay
          }
          values={selectedValues}
        />

        <Button
          display={gameState === GameState.readyToPlay}
          clickHandler={onStartGameClick}
          text="Start Game"
          id="start-game"
        />
        <Button
          display={gameState === GameState.playing}
          clickHandler={onShowSolutionsClick}
          text="Show Solutions"
          id="show-solutions"
        />
      </>
      <div className="container">
        <CardDeck values={littleValues} numberType={"little"} key={1} />
        <CardDeck values={largeValues} numberType={"large"} key={2} />
      </div>
      <ShowSolutions solver={solver} />
    </>
  );
}
