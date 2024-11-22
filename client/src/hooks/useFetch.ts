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
    // Reset all states
    setIsLoading(true);
    setIsError(false);
    setError('');
    setData(null);

    try {
      const res = await fetch(url, { ...options, signal });
      const json = await res.json();
      // Don't check for res.ok because we want the message even if status is other than 200
      setData(json);
    } catch (err) {
      if (err instanceof Error) {
        // Don't trigger error if AbortController error
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
    return () => controller.abort();
  }, [url, refetchFlag]);

  return { data, isLoading, isError, error, refetch };
}

export default useFetch;
