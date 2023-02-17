import React from "react";
interface ShowSolutionsProps {
  solutions: string[];
}

export const ShowSolutions: (props: ShowSolutionsProps) => JSX.Element = (
  props
) => {
  return (
    <>
      <ul>
        {props.solutions.map((s) => {
          return <li key={s}> {s}</li>;
        })}
      </ul>
    </>
  );
};
