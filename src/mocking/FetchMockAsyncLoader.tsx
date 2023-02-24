import React, { useEffect, useState } from "react";
import { asyncLoader, LoadingState } from "./AsyncLoader";
import { CatFactDisplay } from "./CatFactDisplay";
import { ErrorPage } from "./ErrorPage";
import { fetchWithDefaultParameters } from "./fetchWithDefaultParams";
import { Loading } from "./Loading";

export interface CatFact {
  fact: string;
}
// TODO -> should be a way to do this in a const
function isCatFact(obj: unknown): obj is CatFact {
  return typeof obj === "object" && obj !== null && "fact" in obj;
}

export function FetchMockAsyncLoader(): JSX.Element {
  const { data, loadingState } = asyncLoader<CatFact>(isCatFact, () =>
    fetchWithDefaultParameters("http://catfact.ninja/fact")
  );
  if (loadingState === LoadingState.isLoading) {
    return <Loading text="Cat facts" />;
  }
  if (loadingState === LoadingState.hasErrored || data === null) {
    return <ErrorPage />;
  } else {
    return <CatFactDisplay {...data} />;
  }
}
