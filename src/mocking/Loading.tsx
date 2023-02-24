import React from "react";
export const Loading: ({ text }: { text: string }) => JSX.Element = ({
  text,
}) => {
  return <p>Loading {text}</p>;
};
