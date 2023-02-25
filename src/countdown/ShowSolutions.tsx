import React from "react";
import { Solver } from "../solver/Solver";

export const ShowSolutions: ({
  solver,
}: {
  solver: Solver | undefined;
}) => JSX.Element = ({ solver }) => {
  if (solver === undefined) return <></>;
  const solutions = solver.solve().map((s) => s.prettyPrint);
  return (
    <div data-cy="solutions-display" data-testid="solutions-display">
      {solutions.length === 0 ? (
        <NoSolutions />
      ) : (
        <Solutions solutions={solutions} />
      )}
    </div>
  );
};

const Solutions: ({ solutions }: { solutions: string[] }) => JSX.Element = ({
  solutions,
}) => {
  return (
    <div data-testid="solutions-list">
      <ul>
        {solutions.map((s) => {
          return <li key={s}>{s}</li>;
        })}
      </ul>
    </div>
  );
};

const NoSolutions: () => JSX.Element = () => {
  return <p data-testid="no-solutions">This one was impossible</p>;
};
