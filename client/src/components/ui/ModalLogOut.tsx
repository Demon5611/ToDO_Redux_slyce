import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from '../../redux/hooks';
import { logoutHandlerThunk } from '../../redux/slices/user/UserThunks';

type ModalLog = {
  open: boolean;
  handleClick: () => void;
};

export default function ModalLogOut({ open, handleClick }: ModalLog): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!open && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [open]);
  

  return (
    <Dialog
      open={open}
      onClose={handleClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Подтверждение выхода</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Вы нажали кнопку LOGOUT — это не ошибка?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick}>Отмена</Button>
        <Button
          onClick={() => {
            handleClick();
            void dispatch(logoutHandlerThunk());
          }}
          autoFocus
        >
          Выйти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
