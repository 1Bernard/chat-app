'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import { Conversation } from './types';

export default function Home() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // true if screen < md

  return (
    <Box className="h-screen flex flex-col bg-[#FEF7FF]">
      {/* Topbar */}
      <Box className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-300">
        <Box className="flex items-center space-x-2">
          <Box className="bg-purple-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
            🤖
          </Box>
          <Typography variant="h6" className="text-gray-800 font-semibold">
            CHATBOT
          </Typography>
        </Box>

        {/* Hamburger only on mobile */}
        {isMobile && (
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Main Layout */}
      <Box className="flex flex-1 p-4 gap-4 overflow-hidden">
        {/* Sidebar for Desktop */}
        {!isMobile && (
          <Box className="w-full md:w-1/4 rounded-lg p-2">
            <ConversationList
              selectedConversation={selectedConversation}
              onSelectConversation={setSelectedConversation}
            />
          </Box>
        )}

        {/* Chat Section */}
        <Box className="flex-1 bg-white rounded-lg shadow-md flex flex-col overflow-hidden">
          <ChatWindow conversation={selectedConversation} />
        </Box>
      </Box>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: '#FEF7FF',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
            padding: '8px',
          },
        }}
        BackdropProps={{
          sx: {
            backdropFilter: 'blur(4px)',
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
        }}
      >
        <ConversationList
          selectedConversation={selectedConversation}
          onSelectConversation={(conv) => {
            setSelectedConversation(conv);
            setDrawerOpen(false); // close drawer after selecting
          }}
        />
      </Drawer>
    </Box>
  );
}
