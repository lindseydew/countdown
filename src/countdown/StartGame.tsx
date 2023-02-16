import React from "react";

interface StartGameProps {
  canStartGame: boolean;
  onStartGameClick: () => void;
}

export const StartGame: (props: StartGameProps) => JSX.Element = (props) => {
  return (
    <button disabled={!props.canStartGame} onClick={() => props.onStartGameClick()}>
      Start Game
    </button>
  );
};
