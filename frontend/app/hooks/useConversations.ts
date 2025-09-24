import useSWR from 'swr';
import { Conversation } from '../types';
import { api } from '../lib/api';

const fetcher = async (url: string) => {
  const response = await api.get(url);
  return response.data?.data || [];
};

export const useConversations = () => {
  const { data, error, mutate, isLoading } = useSWR<Conversation[]>(
    '/conversations',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 10000
    }
  );

  return {
    conversations: data || [],
    isLoading: isLoading && !error,
    isError: error,
    mutate
  };
};