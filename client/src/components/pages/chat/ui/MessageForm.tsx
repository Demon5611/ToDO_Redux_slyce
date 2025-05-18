import React, { useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import SendIcon from './icons_Chat/SendIcon';

type MessageFormPropsType = {
  submitMessageHandler: (text: string) => void;
  typingHandler: (isTyping: boolean) => void;
};

export default function MessageForm({
  submitMessageHandler,
  typingHandler,
}: MessageFormPropsType): JSX.Element {
  const [input, setInput] = useState<string>('');
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {value} = e.target;
    setInput(value);

    // при вводе сразу отправляем "печатает"
    typingHandler(true);

    // сбрасываем старый таймер
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // и ставим новый — если пользователь остановился, то через 1.5 сек будет false
    typingTimeoutRef.current = setTimeout(() => {
      typingHandler(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    submitMessageHandler(trimmed);
    setInput('');
    typingHandler(false); // после отправки отключаем индикатор
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          onChange={handleChange}
          value={input}
          placeholder="Введите сообщение..."
        />
        <Button type="submit" variant="outline-primary">
          <SendIcon />
        </Button>
      </InputGroup>
    </Form>
  );
}
