import useSWR from 'swr';
import { Conversation } from '../types';
import { api } from '../lib/api';

const fetcher = (url: string) => api.get(url).then(res => {
  console.log('Conversations API response:', res.data);
  return res.data;
});
export const useConversations = () => {
  const { data, error, mutate } = useSWR<{ data: Conversation[] }>(
    '/conversations',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0
    }
  );

  // Extract conversations from the JSON:API response
  const conversations = data?.data || [];

  return {
    conversations,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};