'use client';

import { useState } from 'react';
import { Box } from '@mui/material';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import { Conversation } from './types';

export default function Home() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: 300, borderRight: 1, borderColor: 'divider' }}>
        <ConversationList
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <ChatWindow
          conversation={selectedConversation}
        />
      </Box>
    </Box>
  );
}