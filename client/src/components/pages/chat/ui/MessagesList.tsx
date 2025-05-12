import React from 'react';
import { Stack } from 'react-bootstrap';
import ChatMessage from './ChatMessage';
import type { MessageType } from '../../../../types/messageTypes';
import type { UserType } from '../../../../types/userTypes';

type MessagesListPropsType = {
  deleteMessageHandler: (id: number) => void
  messages: MessageType[];
  logged: UserType;
};

export default function MessagesList({
  deleteMessageHandler,
  messages,
  logged,
}: MessagesListPropsType): JSX.Element {
  return (
    <div className="overflow-auto" style={{ height: '23rem' }}>
      <Stack>
        {messages &&
          messages.map((message) => (
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
