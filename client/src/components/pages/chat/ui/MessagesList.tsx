import React from 'react';
import { Stack, Button } from 'react-bootstrap';
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
    <div className="chat-wrapper">
      <Stack gap={2}>
        {messages.map((msg) => {
          const isOwn = msg.author.id === logged.id;

          return (
            <div key={msg.id}  className={`chat-row ${isOwn ? 'own' : 'other'}`}>
            <div className={`chat-bubble ${isOwn ? 'own' : 'other'}`}>
              <div className="chat-header">
                <span className="chat-author">{msg.author.username}</span>
                {isOwn && (
                  <Button
                    className="delete-btn"
                    size="sm"
                    onClick={() => deleteMessageHandler(msg.id)}
                  >
                    ✕
                  </Button>
                )}
              </div>
              <div className="chat-text">{msg.text}</div>
            </div>
          </div>
          
          
          );
        })}
      </Stack>
    </div>
  );
}
