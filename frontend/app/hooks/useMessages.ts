import useSWR from 'swr';
import { Message, ApiMessage } from '../types';
import { api } from '../lib/api';

const fetcher = (url: string) => api.get(url).then(res => {
  console.log('Messages API response:', res.data);
  return res.data;
});

export const useMessages = (conversationId: number | null) => {
  const { data, error, mutate } = useSWR<{ data: ApiMessage[] }>(
    conversationId ? `/conversations/${conversationId}/messages` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0
    }
  );

  // Extract messages from JSON:API response
  const messages = data?.data.map(item => item.attributes) || [];

  console.log('Processed messages:', messages);

  return {
    messages,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};