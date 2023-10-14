import type {
  UserLoadingType,
  UserLoginType,
  UserSignUpType,
  UserType,
} from '../../types/userTypes';
import apiService from './config';

export const checkUser = async (): Promise<UserType> => {
  const { data } = await apiService<UserType>('/user/check');

  return data;
};

export const userSignUp = async (formData: UserSignUpType): Promise<UserLoadingType> => {
  try {
    const { data } = await apiService.post<UserType>('/user/signup', formData);
    return { ...data, status: 'logged' };
  } catch (error) {
    return { status: 'guest' };
  }
};

export const userLogin = async (formData: UserLoginType): Promise<UserLoadingType> => {
  try {
    const { data } = await apiService.post<UserType>('/user/login', formData);
    return { ...data, status: 'logged' };
  } catch (error) {
    return { status: 'guest' };
  }
};

export const userLogout = async (): Promise<UserLoadingType> => {
  try {
    await apiService('/user/logout');
    return { status: 'guest' };
  } catch (error) {
    return { status: 'guest' };
  }
};

// запросы на сервер
