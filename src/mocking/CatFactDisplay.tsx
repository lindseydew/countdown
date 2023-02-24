import React from "react";
import { CatFact } from "./FetchMockExample";

export const CatFactDisplay: (data: CatFact) => JSX.Element = ({ fact }) => {
  return (
    <div>
      <h1>Cat Facts!</h1>
      <p>{fact}</p>;
    </div>
  );
};
