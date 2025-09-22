import useSWR from 'swr';
import { Message } from '../types';
import { api } from '../lib/api';

const fetcher = (url: string) => api.get(url).then(res => {
  // Handle JSON:API format by extracting data from attributes
  if (res.data && Array.isArray(res.data.data)) {
    return {
      data: res.data.data.map((item: any) => ({
        id: item.id,
        ...item.attributes
      }))
    };
  }
  return res.data;
});

export const useMessages = (conversationId: number | null) => {
  const { data, error, mutate } = useSWR<{ data: Message[] }>(
    conversationId ? `/conversations/${conversationId}/messages` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0
    }
  );

  // Extract messages from JSON:API response
  const messages = data?.data || [];

  return {
    messages,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};