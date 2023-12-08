import React from 'react';
import { Stack } from 'react-bootstrap';
import ChatMessage from './ChatMessage';
import type { MessageType } from '../../../../types/messageTypes';

type MessagesListPropsType = {
  deleteMessageHandler: (id: string) => void;
  messages: MessageType[];
  logged: boolean;
};

export default function MessagesList({
  deleteMessageHandler,
  messages,
  logged,
}: MessagesListPropsType): JSX.Element {
  return (
    <div className="overflow-auto" style={{ height: '23rem' }}>
      <Stack>
        {messages.map((message) => (
          <ChatMessage
            deleteMessageHandler={() => deleteMessageHandler(message.Uid)}
            message={message}
            key={message.Uid}
            logged={logged}
          />
        ))}
      </Stack>
    </div>
  );
}
