import React from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import type { MessageType } from '../../../../types/messageTypes';
import type { UserType } from '../../../../types/userTypes';

type MessagesListPropsType = {
  deleteMessageHandler: (id: number) => void;
  messages: MessageType[];
  logged: UserType;
};

export default function MessagesList({
  deleteMessageHandler,
  messages,
  logged,
}: MessagesListPropsType): JSX.Element {
  return (
    <Box className="chat-wrapper">
      <Stack spacing={2}>
        {messages.map((msg) => {
          const isOwn = msg.author.id === logged.id;

          return (
            <Box key={msg.id} className={`chat-row ${isOwn ? 'own' : 'other'}`}>
              <Box className={`chat-bubble ${isOwn ? 'own' : 'other'}`}>
                <Box
                  className="chat-header"
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '4px',
                  }}
                >
                  <Typography variant="caption" className="chat-author">
                    {msg.author.username}
                  </Typography>

                  {isOwn && (
                    <IconButton
                      size="small"
                      onClick={() => deleteMessageHandler(msg.id)}
                      sx={{
                        fontSize: '0.75rem',
                        padding: '2px 6px',
                        backgroundColor: 'rgb(255, 157, 127)',
                        color: '#000',
                        borderRadius: '16px',
                        '&:hover': {
                          backgroundColor: 'rgb(255, 137, 107)',
                        },
                      }}
                    >
                      ✕
                    </IconButton>
                  )}
                </Box>

                <Typography variant="body1" className="chat-text">
                  {typeof msg.text === 'string' ? msg.text : JSON.stringify(msg.text)}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
