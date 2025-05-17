import React, { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
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
  const [messageInput, setMessageInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessageInput(e.target.value);
  };

  const handleSend = (): void => {
    if (messageInput.trim()) {
      submitMessageHandler(messageInput);
      setMessageInput('');
    }
  };

  return (
    <Stack gap={2} className="p-3 chat-wrapper">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`chat-bubble ${msg.author.id === logged.id ? 'own' : 'other'}`}
        >
          <div className="chat-author">{msg.author.username}</div>
          <div className="chat-text">{msg.text}</div>
        </div>
      ))}

      {writer && <div className="typing-indicator">{writer} печатает...</div>}

      <Form className="d-flex gap-2 mt-3">
        <Form.Control
          type="text"
          value={messageInput}
          onChange={handleChange}
          onFocus={() => typingHandler(true)}
          onBlur={() => typingHandler(false)}
          placeholder="Введите сообщение..."
        />
        <Button variant="primary" onClick={handleSend}>
          ✈
        </Button>
      </Form>
    </Stack>
  );
}
