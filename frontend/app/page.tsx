'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import { Conversation } from './types';

export default function Home() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  return (
    <Box className="h-screen flex flex-col bg-[#FEF7FF]">
      {/* Topbar */}
      <Box className="flex items-center px-4 py-3 bg-white border-b border-gray-300">
        <Box className="flex items-center space-x-2">
          {/* Logo placeholder – can be replaced with an svg */}
          <Box className="bg-purple-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
            🤖
          </Box>
          <Typography variant="h6" className="text-gray-800 font-semibold">
            CHATBOT
          </Typography>
        </Box>
      </Box>

      {/* Main Layout */}
      <Box className="flex flex-1 p-4 gap-4 overflow-hidden">
        {/* Sidebar (Conversations) */}
        <Box className="w-full md:w-1/4 rounded-lg p-2">
          <ConversationList
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
          />
        </Box>

        {/* Chat Section as Card */}
        <Box className="flex-1 bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
          <ChatWindow conversation={selectedConversation} />
        </Box>
      </Box>
    </Box>
  );
}
