'use client';

import { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';
import { Conversation } from '../types';
import { useConversations } from '../hooks/useConversations';
import { api } from '../lib/api';

interface ConversationListProps {
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation | null) => void;
}

export default function ConversationList({
  selectedConversation,
  onSelectConversation
}: ConversationListProps) {
  const { conversations, isLoading, isError, mutate } = useConversations();
  const [isCreating, setIsCreating] = useState(false);
  const [nextConversationNumber, setNextConversationNumber] = useState(1);

  useEffect(() => {
    if (conversations.length > 0) {
      const numbers = conversations.map(conv => {
        if (!conv.title) return 0;
        const match = conv.title.match(/Conversation (\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      });
      const maxNumber = Math.max(...numbers, 0);
      setNextConversationNumber(maxNumber + 1);
    } else {
      setNextConversationNumber(1);
    }
  }, [conversations]);

  const handleCreateConversation = async () => {
    try {
      setIsCreating(true);
      const title = `Conversation ${nextConversationNumber}`;
      const response = await api.post('/conversations', {
        conversation: { title }
      });
      await new Promise(resolve => setTimeout(resolve, 500));
      mutate();
      onSelectConversation(response.data.data);
    } catch (error) {
      console.error('Failed to create conversation:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteConversation = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.delete(`/conversations/${id}`);
      mutate();
      if (selectedConversation?.id === id) {
        onSelectConversation(null);
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">
          Failed to load conversations. Please check if the API server is running.
        </Typography>
        <Button onClick={() => mutate()} sx={{ mt: 1 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }} className="p-2">
      {/* + Conversations button - kept logic & icons intact, styled with Tailwind */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleCreateConversation}
        disabled={isCreating}
        className="w-full justify-center !bg-purple-500 hover:!bg-purple-600 text-white font-semibold rounded-xl py-2 px-4 mb-4 normal-case"
      >
        {isCreating ? <CircularProgress size={16} color="inherit" /> : 'Conversations'}
      </Button>

      <List>
        {conversations.map((conversation) => (
          <ListItem
            key={conversation.id}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => handleDeleteConversation(conversation.id, e)}
                size="small"
              >
                <Delete />
              </IconButton>
            }
          >
            <ListItemButton
              selected={selectedConversation?.id === conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={selectedConversation?.id === conversation.id ? 'bg-purple-200' : ''}
            >
              <ListItemText
                primary={
                  <Typography
                    noWrap
                    title={conversation.title || `Conversation ${conversation.id}`}
                    className={selectedConversation?.id === conversation.id ? 'font-semibold' : ''}
                  >
                    {conversation.title || `Conversation ${conversation.id}`}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
