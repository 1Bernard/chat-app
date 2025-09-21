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

  // Calculate the next conversation number when conversations change
  useEffect(() => {
  if (conversations.length > 0) {
    // Extract numbers from existing conversation titles
    const numbers = conversations.map(conv => {
      const match = conv.title?.match(/Conversation (\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    });
    
    // Find the highest number and add 1
    const maxNumber = Math.max(...numbers, 0);
    setNextConversationNumber(maxNumber + 1);
  } else {
    setNextConversationNumber(1);
  }
}, [conversations]);

  const handleCreateConversation = async () => {
    try {
      setIsCreating(true);
      
      // Generate a title with sequential numbering
      const title = `Conversation ${nextConversationNumber}`;
      
      const response = await api.post('/conversations', {
        conversation: { title }
      });
      
      // Wait a moment for the backend to create the initial message
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
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Conversations</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateConversation}
          disabled={isCreating}
        >
          {isCreating ? <CircularProgress size={16} /> : 'New'}
        </Button>
      </Box>
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
            >
              <ListItemText
                primary={
                  <Typography 
                    noWrap 
                    title={conversation.title || `Conversation ${conversation.id}`}
                    sx={{ fontWeight: selectedConversation?.id === conversation.id ? 'bold' : 'normal' }}
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