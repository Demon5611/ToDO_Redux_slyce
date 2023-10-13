import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';


export const useAppDispatch: () => AppDispatch = useDispatch; // кастомный хук описание типа
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // кастомный хук описание типа
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
