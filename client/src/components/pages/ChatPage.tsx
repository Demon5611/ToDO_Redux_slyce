import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import UsersList from './chat/ui/UsersList';
import ChatComponent from './chat/ui/ChatComponent';
import type { MessageType } from '../../types/messageTypes';
import type { UserType } from '../../types/userTypes';

type ChatTypeProps = {
  user: UserType;
};

type WSMessage =
  | { type: 'SET_ALL_MESSAGES'; payload: MessageType[] }
  | { type: 'SET_USERS'; payload: UserType[] }
  | { type: 'ADD_MESSAGE'; payload: MessageType }
  | { type: 'HIDE_MESSAGE'; payload: number }
  | { type: 'SET_TYPER'; payload: string }
  | { type: 'STARTED_TYPING'; payload: string }
  | { type: 'STOPPED_TYPING'; payload: null }
  | { type: 'CLEAR_TYPER' };

export default function ChatPage({ user: logged }: ChatTypeProps): JSX.Element {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [wsConect, setwsConect] = useState<boolean>(false);
  const [writer, setWriter] = useState<string | null>(null);

  useEffect(() => {
    function createSocket(): void {
      const socket = new WebSocket('ws://localhost:3000');

      socket.onopen = () => {
        socketRef.current = socket;
        console.log('Front: Socket connected');
        setwsConect(true);
      };

      socket.onclose = () => {
        console.log('Socket disconnected');
        setTimeout(createSocket, 2000);
      };

      socket.onerror = (error) => console.error('Front: onerror', error);

      socket.onmessage = (event: MessageEvent<string>) => {
        try {
          const action: WSMessage = JSON.parse(event.data) as WSMessage;
          switch (action.type) {
            case 'SET_ALL_MESSAGES':
              setMessages(action.payload);
              break;
            case 'SET_USERS':
              setUsers(action.payload);
              break;
            case 'ADD_MESSAGE':
              setMessages((prev) => [...prev, action.payload]);
              break;
            case 'SET_TYPER':
              setWriter(action.payload);
              break;
            case 'STARTED_TYPING':
              setWriter(action.payload);
              break;
            case 'STOPPED_TYPING':
              setWriter(null);
              break;

            case 'HIDE_MESSAGE':
              setMessages((prev) => prev.filter((msg) => msg.id !== action.payload));
              break;
            case 'CLEAR_TYPER':
              setWriter(null);
              break;
            default:
              console.warn('Unknown WS message:', action);
          }
        } catch (err) {
          console.error('Invalid WS message:', err);
        }
      };
    }

    createSocket();
  }, []);

  const deleteMessageHandler = (id: number): void => {
    if (!socketRef.current) return;
    socketRef.current?.send(JSON.stringify({ type: 'DELETE_MESSAGE', payload: id }));
  };

  const submitMessageHandler = (inputText: string): void => {
    if (!socketRef.current) return;
    socketRef.current?.send(JSON.stringify({ type: 'SEND_MESSAGE', payload: inputText }));
  };

  const typingHandler = (isTyping: boolean): void => {
    if (!socketRef.current) return;
    const action = isTyping
      ? { type: 'STARTED_TYPING', payload: logged.username }
      : { type: 'STOPPED_TYPING', payload: null };
    socketRef.current?.send(JSON.stringify(action));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper elevation={2} sx={{ p: 2, height: '80vh', overflowY: 'auto' }}>
            <UsersList users={users} />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper
            elevation={2}
            sx={{ p: 2, height: '80vh', display: 'flex', flexDirection: 'column' }}
          >
            <ChatComponent
              deleteMessageHandler={deleteMessageHandler}
              submitMessageHandler={submitMessageHandler}
              typingHandler={typingHandler}
              messages={messages}
              logged={logged}
              writer={writer}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
