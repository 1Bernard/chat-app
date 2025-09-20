import useSWR from 'swr';
import { Conversation } from '../types';
import { api } from '../lib/api';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export const useConversations = () => {
  const { data, error, mutate } = useSWR<{ data: Conversation[] }>(
    '/conversations',
    fetcher
  );

  return {
    conversations: data?.data || [],
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};