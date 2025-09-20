import useSWR from 'swr';
import { Message } from '../types';
import { api } from '../lib/api';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export const useMessages = (conversationId: number | null) => {
  const { data, error, mutate } = useSWR<{ data: Message[] }>(
    conversationId ? `/conversations/${conversationId}/messages` : null,
    fetcher,
    { refreshInterval: 1000 } // Poll for new messages
  );

  return {
    messages: data?.data || [],
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};