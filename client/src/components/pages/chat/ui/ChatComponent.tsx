import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import MessagesList from './MessagesList';
import MessageForm from './MessageForm';
import type { MessageType } from '../../../../types/messageTypes';
import type { UserType } from '../../../../types/userTypes';

type ChatComponentPropsType = {
  deleteMessageHandler: (id: number) => void;
  submitMessageHandler: (inputText: string) => void;
  typingHandler: (isTyping: boolean) => void;
  messages: MessageType[];
  logged: UserType;
  writer?: string | null;
};

export default function ChatComponent({
  deleteMessageHandler,
  messages,
  logged,
  submitMessageHandler,
  typingHandler,
  writer,
}: ChatComponentPropsType): JSX.Element {
  return (
    <Stack
      gap={2}
      className="chat-wrapper"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        width: '95%',
        ml: 0,
      }}
    >
      <MessagesList
        deleteMessageHandler={deleteMessageHandler}
        messages={messages}
        logged={logged}
      />

      {writer && writer !== logged.username && (
        <Box
          className="typing-indicator"
          sx={{ display: 'flex', alignItems: 'center', gap: '4px', pl: 1 }}
        >
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#999' }}>
            {writer} печатает...
          </Typography>
          <span className="typing-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </Box>
      )}

      <MessageForm submitMessageHandler={submitMessageHandler} typingHandler={typingHandler} />
    </Stack>
  );
}
