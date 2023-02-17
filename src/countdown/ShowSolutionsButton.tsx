import React from "react";

interface ShowSolutionsButtonProps {
  gameHasStarted: boolean;
  onShowSolutionsClick: () => void;
}

export const ShowSolutionsButton: (props: ShowSolutionsButtonProps) => JSX.Element = (
  props
) => {
  return (
    <button
      disabled={!props.gameHasStarted}
      onClick={() => props.onShowSolutionsClick()}
    >
      Show Solutions
    </button>
  );
};
