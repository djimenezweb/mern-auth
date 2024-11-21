import { fetchGetOptions } from '@/config/fetchOptions';
import { useEffect, useState } from 'react';

function useFetch<Type>(url: string, options: RequestInit = fetchGetOptions) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<Type | null>(null);
  const [refetchFlag, setRefetchFlag] = useState(true);

  function refetch() {
    setRefetchFlag(prev => !prev);
  }

  // Function definition
  async function startFetching(signal: AbortSignal) {
    try {
      const res = await fetch(url, { ...options, signal });
      if (!res.ok) {
        console.log('res when res not ok', res);
        throw new Error('An error ocurred - res not ok');
      }
      const json = await res.json();
      setIsError(false);
      setData(json);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        if (err.name !== 'AbortError') {
          setIsError(true);
          setError(JSON.stringify(err.message));
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    // Call function
    startFetching(controller.signal);

    // useEffect cleanup function
    return () => {
      controller.abort();
      // Reset all states
      setIsLoading(true);
      setIsError(false);
      setError('');
      setData(null);
    };
  }, [url, refetchFlag]);

  return { data, isLoading, isError, error, refetch };
}

export default useFetch;
