import type { UserType } from './userTypes';

export type MessageType = {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
    email: string;
  };
};

type WSMessage =
  | { type: 'SET_ALL_MESSAGES'; payload: MessageType[] }
  | { type: 'SET_USERS'; payload: UserType[] }
  | { type: 'ADD_MESSAGE'; payload: MessageType }
  | { type: 'SET_TYPER'; payload: string }
  | { type: 'HIDE_MESSAGE'; payload: number }
  | { type: 'CLEAR_TYPER' };

export type StatusChatType =
  | 'SEND_MESSAGE'
  | 'DELETE_MESSAGE'
  | 'STARTED_TYPING'
  | 'STOPPED_TYPING'
  | 'ADD_MESSAGE'
  | 'SET_USERS'
  | 'SET_ALL_MESSAGES'
  | 'HIDE_MESSAGE'
  | 'SET_TYPER'
  | 'CLEAR_TYPER';
