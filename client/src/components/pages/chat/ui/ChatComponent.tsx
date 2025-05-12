import React from 'react';
import { Stack } from 'react-bootstrap';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';
import type { MessageType } from '../../../../types/messageTypes';
import type { UserType } from '../../../../types/userTypes';

type ChatComponentPropsType = {
  deleteMessageHandler: (id: number) => void;
  submitMessageHandler: (inputText: string) => void;
  typingHandler: (isTyping: boolean) => void;
  messages: MessageType[];
  logged: UserType;
};
export default function ChatComponent({
  deleteMessageHandler,
  messages,
  logged,
  submitMessageHandler,
  typingHandler,
}: ChatComponentPropsType): JSX.Element {
  const writes = true;
  return (
    <Stack>
      <MessagesList
        deleteMessageHandler={deleteMessageHandler}
        messages={messages}
        logged={logged}
      />
      <div className="fs-6 fw-light">{writes ? ' печатает...' : `\xa0`}</div>
      <MessageForm submitMessageHandler={submitMessageHandler} typingHandler={typingHandler} />
    </Stack>
  );
}
// {writes ? 'Alex печатает...' : `\xa0`}
// проверяет условие writes. Если writes истинно, то отображается текст 'Alex печатает...', в противном случае отображается неразрываемый пробел (\xa0).
// Таким образом, когда условие ложно, компонент отображает пустой текстовый узел, который содержит только неразрываемый пробел.
