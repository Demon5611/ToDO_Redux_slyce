import React, { useEffect, useRef, useState } from 'react';
import {  Button, Stack } from 'react-bootstrap';
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
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 👇 Обработка печати
  useEffect(() => {
    if (!inputText) {
      typingHandler(false);
      return;
    }

    typingHandler(true);

    const timer = setTimeout(() => {
      typingHandler(false);
    }, 1500); // отключаем после паузы

    return () => clearTimeout(timer);
  }, [inputText]);


  return (

    
        <Stack gap={2} className="p-3 chat-wrapper d-flex flex-column">
      {messages.map((msg) => {
        const isOwn = msg.author.id === logged.id;
        return (
          <div key={msg.id} className={`chat-bubble ${isOwn ? 'own' : 'other'}`}>
            <div className="chat-author">{msg.author.username}</div>
            <div className="chat-text">{msg.text}</div>
            {isOwn && (
              <Button className="delete-btn" size="sm" onClick={() => deleteMessageHandler(msg.id)}>
                ✕
              </Button>
            )}
          </div>
        );
      })}

      {writer && <div className="typing-indicator">{writer} печатает...</div>}

      <MessageForm submitMessageHandler={submitMessageHandler} typingHandler={typingHandler} />
    </Stack>
      

  );
}
