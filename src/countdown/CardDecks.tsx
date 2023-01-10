import React from "react";
import { CardDeck } from "./CardDeck";
import "./card.scss";

export const CardDecks: () => JSX.Element = () => {
  return (
    <div className="container">
      <CardDeck />
      <CardDeck />
    </div>
  );
};
