import React from 'react';
import { Stack } from 'react-bootstrap';
import MessageForm from './MessageForm'; // ✅ импорт готовой формы
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
    <Stack gap={2} className="p-3 chat-wrapper d-flex flex-column">
      {messages.map((msg) => {
        const isOwn = msg.author.id === logged.id;
        return (
          <div key={msg.id} className={`chat-bubble ${isOwn ? 'own' : 'other'}`}>
            <div className="chat-author">{msg.author.username}</div>
            <div className="chat-text">{msg.text}</div>
          </div>
        );
      })}

      {writer && <div className="typing-indicator">{writer} печатает...</div>}

      <MessageForm submitMessageHandler={submitMessageHandler} typingHandler={typingHandler} />
    </Stack>
  );
}
