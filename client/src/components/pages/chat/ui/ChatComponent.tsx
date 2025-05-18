import React from 'react';
import { Stack } from 'react-bootstrap';
import MessagesList from './MessagesList';
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
      <MessagesList
        deleteMessageHandler={deleteMessageHandler}
        messages={messages}
        logged={logged}
      />

      {/* Показываем индикатор, только если пишет кто-то другой */}
      {writer && writer !== logged.username && (
        <div className="typing-indicator">
          {writer} печатает...
          <span className="typing-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      )}

      <MessageForm submitMessageHandler={submitMessageHandler} typingHandler={typingHandler} />
    </Stack>
  );
}
