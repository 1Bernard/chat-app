'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { Conversation, AnyMessage, TempMessage, isTempMessage } from '../types';
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
  const [optimisticMessages, setOptimisticMessages] = useState<TempMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages: serverMessages, mutate } = useMessages(conversation?.id || null);

  const allMessages: AnyMessage[] = [...serverMessages, ...optimisticMessages].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages, showTypingIndicator]);

  useEffect(() => {
    if (conversation?.id) {
      mutate();
      setOptimisticMessages([]);
    }
  }, [conversation?.id, mutate]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !conversation || isSending) return;

    try {
      setIsSending(true);
      const content = inputValue.trim();
      setInputValue('');

      const tempMessage: TempMessage = {
        id: `temp-${Date.now()}`,
        content,
        role: 'user',
        conversation_id: conversation.id,
        created_at: new Date().toISOString(),
        isOptimistic: true
      };

      setOptimisticMessages(prev => [...prev, tempMessage]);

      await api.post(`/conversations/${conversation.id}/messages`, {
        message: { content }
      });

      setShowTypingIndicator(true);

      setTimeout(async () => {
        setShowTypingIndicator(false);
        await mutate();
        setOptimisticMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
        setIsSending(false);
      }, 2500);
    } catch (error) {
      console.error('Failed to send message:', error);
      setOptimisticMessages(prev =>
        prev.filter(msg => !isTempMessage(msg) || !msg.isOptimistic)
      );
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
      <Box className="flex items-center justify-center h-full bg-gray-100">
        <Typography variant="h6" className="text-gray-500">
          Select a conversation to start chatting
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col h-full">
      {/* Chat Header inside card */}
      <Box className="flex items-center px-4 py-3 border-b border-gray-200 bg-white">
        <Box className="bg-purple-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-2">
          🤖
        </Box>
        <Typography variant="subtitle1" className="font-semibold text-gray-700">
          Chatbot
        </Typography>
      </Box>

      {/* Messages */}
      <Box className="flex-1 overflow-y-auto p-4 bg-white">
        {allMessages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOptimistic={isTempMessage(message) && message.isOptimistic}
          />
        ))}
        {showTypingIndicator && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input with Send inside */}
      <Box className="p-4 border-t border-gray-200 bg-white">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Reply to Chatbot"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSending || !conversation}
          multiline
          maxRows={4}
          className="rounded-full bg-[#ECE6F0]"
          InputProps={{
            classes: { notchedOutline: '!border-0' },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isSending || !conversation}
                  className="text-purple-600"
                >
                  {isSending ? <CircularProgress size={20} className="text-purple-600" /> : <Send />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Box>
  );
}
