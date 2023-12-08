import React from 'react';
import { Card, CloseButton } from 'react-bootstrap';
import type { MessageType } from '../../../../types/messageTypes';
import type { UserType } from '../../../../types/userTypes';

type ChatMessagePropsType = {
  deleteMessageHandler: (id: string) => void;
  message: MessageType;
  logged: UserType;
};

export default function ChatMessage({
  deleteMessageHandler,
  message,
  logged,
}: ChatMessagePropsType): JSX.Element {
  const isAuthor = logged.id === message.Uid;
  const justifyContent = isAuthor ? 'justify-content-end' : 'justify-content-start';
  return (
    <div className={`d-flex ${justifyContent}`}>
      <Card style={{ width: '15rem' }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
            <p>{message.User.username}</p>
            <CloseButton
              disabled={!isAuthor}
              onClick={() => deleteMessageHandler(message.id)}
              aria-label="Close"
            />
          </Card.Subtitle>
          <Card.Text>{message.text}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
