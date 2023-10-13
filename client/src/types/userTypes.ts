export type UserType = {
  id: number;
  username: string;
  email: string;
};

export type UserSignUpType = Omit<UserType, 'id'> & { password: string };

export type UserLoginType = Omit<UserSignUpType, 'username'>;

export type UserLoadingType =
  | (UserType & { status: 'logged' })
  | { status: 'loading' }
  | { status: 'guest' };
