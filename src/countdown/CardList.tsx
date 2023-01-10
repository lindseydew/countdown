import React from "react";
import { CardSelected } from "./Card";
import "./cardlist.scss";

export const CardList: () => JSX.Element = () => {
  return (
    <div className="card-list">
      {Array(6)
        .fill(0)
        .map((_) => {
          return <CardSelected />;
        })}
    </div>
  );
};
