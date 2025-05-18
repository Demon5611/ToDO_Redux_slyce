import React from 'react';
import { Button, Stack } from 'react-bootstrap';
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
      

      {writer && <div className="typing-indicator">{writer} печатает...</div>}

      <MessageForm submitMessageHandler={submitMessageHandler} typingHandler={typingHandler} />
    </Stack>
  );
}
