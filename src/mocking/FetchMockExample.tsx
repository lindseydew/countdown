import React, { useEffect, useState } from "react";
import { CatFactDisplay } from "./CatFactDisplay";
import { ErrorPage } from "./ErrorPage";
import { Loading } from "./Loading";

export interface CatFact {
  fact: string;
}

const isCatFact = (obj: unknown) =>
  typeof obj === "object" && obj !== null && "fact" in obj;

export function FetchMockExample(): JSX.Element {
    
  const [data, setData] = useState<CatFact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((r) => r.json())
      .then((obj) => {
        if (isCatFact(obj)) {
          setData(obj);
        } else {
          setHasErrors(true);
        }
        setIsLoading(false);
      })
      .catch((_) => {
        setHasErrors(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading text="Cat facts" />;
  }
  if (hasErrors || data === null) {
    return <ErrorPage />;
  } else {
    return <CatFactDisplay {...data} />;
  }
}
