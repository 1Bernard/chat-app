import useSWR from 'swr';
import { Message } from '../types';
import { api } from '../lib/api';

const fetcher = async (url: string) => {
  const response = await api.get(url);
  // Handle JSON:API format
  if (response.data?.data) {
    return response.data.data.map((item: any) => ({
      id: item.id,
      ...item.attributes
    }));
  }
  return [];
};

export const useMessages = (conversationId: number | null) => {
  const { data, error, mutate, isLoading } = useSWR<Message[]>(
    conversationId ? `/conversations/${conversationId}/messages` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5000 // Prevent duplicate requests within 5 seconds
    }
  );

  return {
    messages: data || [],
    isLoading: isLoading && !error,
    isError: error,
    mutate
  };
};