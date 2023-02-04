import React from "react";
import "./target.scss";
interface TargetProps {
  value?: number;
}

export const Target: (props: TargetProps) => JSX.Element = (props) => {
  return <div className="target">{props.value}</div>;
};
