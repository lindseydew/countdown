import { useEffect, useState } from "react";

export enum LoadingState {
  isLoading,
  hasLoaded,
  hasErrored,
}

// TODO - remind myself how to do currying in typescript
export function asyncLoader<T>(
  guard: (obj: unknown) => obj is T,
  asyncFetch: () => Promise<any>
): {
  data: T | null;
  loadingState: LoadingState;
} {
  const [data, setData] = useState<T | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.isLoading
  );

  useEffect(() => {
    if (loadingState === LoadingState.isLoading) {
      asyncFetch()
        .then((res) => res.json())
        .then((d) => {
          if (guard(d)) {
            setData(d);
            setLoadingState(LoadingState.hasLoaded);
          } else {
            setLoadingState(LoadingState.hasErrored);
          }
        })
        .catch((_) => {
          setLoadingState(LoadingState.hasLoaded);
        });
    }
  }, [loadingState]);

  return {
    data,
    loadingState,
  };
}
