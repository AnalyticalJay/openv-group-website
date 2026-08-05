import { useState, useEffect, useCallback } from 'react';

interface UseAsyncDataOptions {
  delay?: number; // Minimum delay before showing content (for skeleton effect)
  retries?: number; // Number of retry attempts on error
  retryDelay?: number; // Delay between retries in ms
}

interface UseAsyncDataState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  retry: () => void;
}

/**
 * Custom hook for managing async data loading with skeleton states
 * Provides loading state, error handling, and retry logic
 * 
 * @example
 * const { data, isLoading, error } = useAsyncData(
 *   () => fetch('/api/data').then(r => r.json()),
 *   { delay: 300 }
 * );
 * 
 * return isLoading ? <SkeletonCard /> : <DataCard data={data} />;
 */
export function useAsyncData<T>(
  asyncFn: () => Promise<T>,
  options: UseAsyncDataOptions = {}
): UseAsyncDataState<T> {
  const { delay = 0, retries = 3, retryDelay = 1000 } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Wait for minimum delay (for skeleton effect)
      await new Promise(resolve => setTimeout(resolve, delay));

      // Fetch data
      const result = await asyncFn();
      setData(result);
      setRetryCount(0);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      
      // Retry logic
      if (retryCount < retries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        setRetryCount(prev => prev + 1);
        fetchData();
      } else {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [asyncFn, delay, retries, retryDelay, retryCount]);

  useEffect(() => {
    fetchData();
  }, []);

  const retry = useCallback(() => {
    setRetryCount(0);
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, retry };
}

/**
 * Hook for managing multiple async data requests
 * Useful for loading multiple sections simultaneously
 */
export function useAsyncDataMultiple<T>(
  asyncFns: (() => Promise<T>)[],
  options: UseAsyncDataOptions = {}
): UseAsyncDataState<T[]> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const { delay = 0, retries = 3, retryDelay = 1000 } = options;

  const fetchAllData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Wait for minimum delay
      await new Promise(resolve => setTimeout(resolve, delay));

      // Fetch all data in parallel
      const results = await Promise.all(asyncFns.map(fn => fn()));
      setData(results);
      setRetryCount(0);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      
      if (retryCount < retries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        setRetryCount(prev => prev + 1);
        fetchAllData();
      } else {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [asyncFns, delay, retries, retryDelay, retryCount]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const retry = useCallback(() => {
    setRetryCount(0);
    fetchAllData();
  }, [fetchAllData]);

  return { data, isLoading, error, retry };
}

/**
 * Hook for managing paginated async data
 */
export function useAsyncDataPaginated<T>(
  asyncFn: (page: number) => Promise<T[]>,
  options: UseAsyncDataOptions & { pageSize?: number } = {}
) {
  const { delay = 0, retries = 3, retryDelay = 1000, pageSize = 10 } = options;
  
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const fetchPage = useCallback(async (pageNum: number) => {
    try {
      setIsLoading(true);
      setError(null);

      // Wait for minimum delay
      await new Promise(resolve => setTimeout(resolve, delay));

      // Fetch page data
      const results = await asyncFn(pageNum);
      
      if (pageNum === 1) {
        setData(results);
      } else {
        setData(prev => [...prev, ...results]);
      }
      
      setHasMore(results.length === pageSize);
      setRetryCount(0);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      
      if (retryCount < retries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        setRetryCount(prev => prev + 1);
        fetchPage(pageNum);
      } else {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [asyncFn, delay, retries, retryDelay, retryCount, pageSize]);

  useEffect(() => {
    fetchPage(page);
  }, [page]);

  const loadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  const retry = useCallback(() => {
    setRetryCount(0);
    fetchPage(page);
  }, [page, fetchPage]);

  return { data, isLoading, error, page, hasMore, loadMore, retry };
}
