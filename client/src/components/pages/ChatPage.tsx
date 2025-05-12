import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import UsersList from './chat/ui/UsersList';
import ChatComponent from './chat/ui/ChatComponent';
import type { MessageType } from '../../types/messageTypes';
import type { UserType } from '../../types/userTypes';

type ChatTypeProps = {
  messages: MessageType[];
  user: UserType;
};

type WSMessage =
  | { type: 'SET_USERS'; payload: UserType[] }
  | { type: 'ADD_MESSAGE'; payload: MessageType }
  | { type: 'SET_TYPER'; payload: string }
  | { type: 'HIDE_MESSAGE'; payload: number }
  | { type: 'CLEAR_TYPER' };

export default function ChatPage({
  messages: initMessages,
  user: logged,
}: ChatTypeProps): JSX.Element {
  const [messages, setMessages] = useState<MessageType[]>(initMessages);
  const [users, setUsers] = useState<UserType[]>([]);
  const socketRef = useRef<WebSocket | null>(null); // Создаем ссылку на сокет скрола (обращаемся к последнему сообщению). useRef предоставляет доступ к DOM-элементу  - ОБЯЗАТЕЛЬНО ПРИ СОЗД ЧАТА на сокетах
  const [wsConect, setwsConect] = useState<boolean>(false); // для отображения 'CHAT' красной если не подключен и зеленый, если подключен к сокетам
  const [writer, setWriter] = useState<string | null>(null); // делаем индикацию кто печатает nuul | User['name']

  // поместили всю логику в useEffect и запускаем его только один раз и только при первом рендере компонента, когда он монтируется. Запускается сервер, запускается фронт и открывается соединение
  useEffect(() => {
    function createSocket(): any {
      const socket = new WebSocket('ws://localhost:3000'); // обьявили перем котор подкл к WS - идем на сервер и прописываем все там
      socket.onopen = () => {
        // при откр сокета уст-м соединение с сервером
        socketRef.current = socket; // положили соединение в обьект current.  изменяемые стейты сокета мы не можем хранить в useEffect (useEffect хранит в себе сост котор вызыв перерисовку компонента при изменении ), поэтому исп useRef
        console.log('Front: Socket connected');
        setwsConect(true); // отображаем 'CHAT'  зеленый, когда подключен
      };

      socket.onclose = () => {
        console.log('Socket disconnected');
        setTimeout(createSocket, 2000); // сделали переконект сокетов на случай. если свет моргнул и все отвалилось
      };

      socket.onerror = (error) => console.error('Front: onerror', error);

      socket.onmessage = (event: MessageEvent<string>) => {
        try {
          const action: WSMessage = JSON.parse(event.data) as WSMessage;
          switch (action.type) {
            case 'SET_USERS':
              setUsers(action.payload);
              break;
            case 'ADD_MESSAGE':
              setMessages((prev) => [...prev, action.payload]);
              break;
            case 'SET_TYPER':
              setWriter(action.payload);
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
    const action = { type: 'DELETE_MESSAGE', payload: id };
    socketRef.current.send(JSON.stringify(action));
  };

  const submitMessageHandler = (inputText: string): void => {
    if (!socketRef.current) return;
    const action = { type: 'SEND_MESSAGE', payload: inputText };
    socketRef.current.send(JSON.stringify(action));
  };

  const typingHandler = (isTyping: boolean): void => {
    if (isTyping && socketRef.current)
      socketRef.current.send(JSON.stringify({ type: 'STARTED_TYPING' }));
    else if (!isTyping && socketRef.current)
      socketRef.current.send(JSON.stringify({ type: 'STOPPED_TYPING' }));
  };

  return (
    <Container>
      <Row>
        <Col xs={2}>
          <UsersList users={users} />
        </Col>
        <Col xs={10}>
          <ChatComponent
            deleteMessageHandler={deleteMessageHandler}
            submitMessageHandler={submitMessageHandler}
            typingHandler={typingHandler}
            messages={messages}
            logged={logged}
          />
          {writer && `${writer} is typing...`}
        </Col>
      </Row>
    </Container>
  );
}
