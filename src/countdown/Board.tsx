import React from "react";
import { CardDecks } from "./CardDecks";
import { CardList } from "./CardList";

export const Board: () => JSX.Element = () => {
  return (
    <>
      <CardList />
      <CardDecks />
    </>
  );
};
