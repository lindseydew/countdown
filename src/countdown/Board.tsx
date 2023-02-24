import React, { useState } from "react";
import { CardDeck } from "./CardDeck";
import "./card.scss";
import { LARGE_VALUES, LITTLE_VALUES } from "../cardvalues";
import { CardList } from "./CardList";
import { Target } from "./Target";
import { StartGame } from "./StartGame";
import { ShowSolutionsButton } from "./ShowSolutionsButton";
import { ShowSolutions } from "./ShowSolutions";
import { Solver } from "../solver/Solver";

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
  const [solutions, setSolutions] = useState<string[]>([]);

  const onStartGameClick: () => void = () => {
    setTarget(generateTarget());
    setGameState(GameState.playing);
  };

  const onShowSolutionsClick: () => void = () => {
    if (target !== undefined) {
      const solver = new Solver(target, selectedValues);
      const expressions = solver.solve();
      const solutions = expressions.map((s) => s.prettyPrint);
      setSolutions(solutions);
    }
    setGameState(GameState.finished);
  };
  const cardDroppedCallback: (n: number) => void = (n) => {
    if (gameState === GameState.setUp) {
      if (isLittleValue(n)) {
        setLittleValues((values) => removeElementFromArray(n, values));
        setSelectedValues((values) => [...values, n]);
      } else {
        setLargeValues((values) => removeElementFromArray(n, values));
        setSelectedValues((values) => [...values, n]);
      }
      // TODO -> should this be a callback?
      if ([...largeValues, ...littleValues].length <= 19) {
        setGameState(GameState.readyToPlay);
      }
    }
  };
  return (
    <>
      <>
        <Target value={target} />
        <CardList
          onCardDropped={cardDroppedCallback}
          cardFaceDown={
            gameState === GameState.setUp || gameState === GameState.readyToPlay
          }
        />
        <StartGame
          canStartGame={gameState === GameState.readyToPlay}
          onStartGameClick={onStartGameClick}
        />
        <ShowSolutionsButton
          gameHasStarted={gameState === GameState.playing}
          onShowSolutionsClick={onShowSolutionsClick}
        />
      </>
      <div className="container">
        <CardDeck values={littleValues} numberType={"little"} key={1} />
        <CardDeck values={largeValues} numberType={"large"} key={2} />
      </div>
      <ShowSolutions solutions={solutions} />
    </>
  );
}
