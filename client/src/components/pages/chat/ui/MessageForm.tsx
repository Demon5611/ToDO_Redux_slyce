import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import SendIcon from './icons_Chat/SendIcon';

type MessageFormPropsType = {
  submitMessageHandler: (message: string) => void;
  typingHandler: (isTyping: boolean) => void;
};

export default function MessageForm({
  submitMessageHandler,
  typingHandler,
}: MessageFormPropsType): JSX.Element {
  const [input, setInput] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  // создаем useEffect который будет следить за инпутом, что бы подсветить индикацию кто печатает

  useEffect(() => {
    if (input.length) typingHandler(true);
    else typingHandler(false);
  }, [input]);
  // дописать код на бэк в connection - принять/  допишем STARTED_TYPING

  return (
    <Form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        submitMessageHandler(input);
        setInput('');
      }}
    >
      <InputGroup className="mb-3">
        <Form.Control
          onChange={handleChange}
          value={input}
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2">
          <Button type="submit" variant="outline-primary">
            <SendIcon />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
