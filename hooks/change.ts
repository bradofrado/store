import { DependencyList, useCallback, useEffect } from 'react';
import { usePrevious } from './previous';

export const useChange = <T>(
  value: T,
  callback: (curr: T, prev: T | undefined) => void,
  deps: DependencyList
): void => {
  const previous = usePrevious(value);
  const callbackRef = useCallback(callback, deps);
  useEffect(() => {
    if (!valueEqual(value, previous)) {
      callbackRef(value, previous);
    }
  }, [previous, value, callbackRef]);
};

const valueEqual = <T>(a: T, b: T): boolean => {
  if (typeof a !== 'object' || typeof b !== 'object') {
    return a === b;
  }
  return JSON.stringify(a) === JSON.stringify(b);
};
