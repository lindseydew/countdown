import React from "react";
import { Card } from "./Card";
import "./card.scss";

export const CardList: () => JSX.Element = () => {
  return (
    <div className="container">
      {Array(6)
        .fill(0)
        .map((_) => {
          return <Card facedown={false} />;
        })}
    </div>
  );
};
