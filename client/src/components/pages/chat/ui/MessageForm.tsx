import React, { useEffect, useState } from 'react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  useEffect(() => {
    typingHandler(input.length > 0);
  }, [input, typingHandler]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    submitMessageHandler(input);
    setInput('');
  };

  return (
    <Form onSubmit={handleSubmit}>
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
