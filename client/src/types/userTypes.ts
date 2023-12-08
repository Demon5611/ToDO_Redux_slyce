export type UserType = {
  [x: string]: string | number | string[] | undefined;
  password: string | number | string[] | undefined;
  id: number;
  username: string;
  email: string;
};

export type UserSignUpType = Omit<UserType, 'id'> & { password: string };
export type UserLoginType = Omit<UserSignUpType, 'username'>;
export type UserUpdateType = any;
export type UserLoadingType =
  | (UserType & { status: 'logged' })
  | { status: 'loading' }
  | { status: 'guest' };
