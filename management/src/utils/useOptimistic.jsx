import { useState, useCallback } from 'react';

const useOptimistic = (initialState) => {
  const [state, setState] = useState(initialState);
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async (asyncFunction) => {
    setPending(true);
    setError(null);
    try {
      const result = await asyncFunction();
      setState(result);
    } catch (err) {
      setError(err);
    } finally {
      setPending(false);
    }
  }, []);

  return { state, isPending, error, run };
};

export default useOptimistic;