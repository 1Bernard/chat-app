'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { Conversation } from '../types';
import { useMessages } from '../hooks/useMessages';
import { api } from '../lib/api';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  conversation: Conversation | null;
}

export default function ChatWindow({ conversation }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, mutate } = useMessages(conversation?.id || null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTypingIndicator]);

  // Refresh messages when conversation changes
  useEffect(() => {
    if (conversation?.id) {
      mutate();
    }
  }, [conversation?.id, mutate]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !conversation || isSending) return;

    try {
      setIsSending(true);
      const content = inputValue.trim();
      setInputValue('');
      
      await api.post(`/conversations/${conversation.id}/messages`, {
        message: { content }
      });
      
      // Show typing indicator
      setShowTypingIndicator(true);
      
      // Wait for the bot response
      setTimeout(async () => {
        setShowTypingIndicator(false);
        await mutate(); // Refresh messages to get the bot response
        setIsSending(false);
      }, 2500);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsSending(false);
      setShowTypingIndicator(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!conversation) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          bgcolor: 'grey.100'
        }}
      >
        <Typography variant="h6" color="grey.500">
          Select a conversation to start chatting
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Paper sx={{ p: 2, borderRadius: 0 }}>
        <Typography variant="h6">{conversation.title}</Typography>
      </Paper>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: 'grey.100' }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {showTypingIndicator && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Paper sx={{ p: 2, borderRadius: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSending || !conversation}
            multiline
            maxRows={4}
            sx={{ mr: 1 }}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isSending || !conversation}
          >
            {isSending ? <CircularProgress size={24} /> : <Send />}
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}