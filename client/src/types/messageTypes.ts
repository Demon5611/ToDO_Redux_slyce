export type MessageType = {
  User: any;
  id: number;
  Uid: number;
  text: string;
  username: string;
};

export type StatusChatType =
  | 'SEND_MESSAGE'
  | 'DELETE_MESSAGE'
  | 'STARTED_TYPING'
  | 'STOPPED_TYPING'
  | 'ADD_MESSAGE'
  | 'SET_USERS'
  | 'HIDE_MESSAGE'
  | 'SET_TYPER'
  | 'CLEAR_TYPER';

// export enum StatusChatType {
//   SEND_MESSAGE = 'SEND_MESSAGE',
//   DELETE_MESSAGE = 'DELETE_MESSAGE',
//   STARTED_TYPING = 'STARTED_TYPING',
//   STOPPED_TYPING = 'STOPPED_TYPING',

//   // Server -> Client actions
//   ADD_MESSAGE = 'ADD_MESSAGE',
//   SET_USERS = 'SET_USERS',
//   HIDE_MESSAGE = 'HIDE_MESSAGE',
//   SET_TYPER = 'SET_TYPER',
//   CLEAR_TYPER = 'CLEAR_TYPER',
// }
