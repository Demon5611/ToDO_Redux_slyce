import React, { useRef, useState } from 'react';
import { Box, Button, TextField, InputAdornment, IconButton } from '@mui/material';
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
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    submitMessageHandler(trimmed);
    setInput('');
    typingHandler(false); 
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="message-form"
      sx={{ mt: 1, display: 'flex', gap: 1 }}
    >
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Введите сообщение..."
        value={input}
        onChange={handleChange}
        className="input-group"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
