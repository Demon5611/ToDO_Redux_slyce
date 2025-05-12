import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

export default function MainPage(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Изменяем направление флекс-контейнера на вертикальное
        alignItems: 'center', // Выравниваем по центру по горизонтали
        '& > :not(style)': {
          mb: '50px', // Отступ между карточками по вертикали
          width: '70%',
        },
      }}
    >
      <Paper>
        <Typography
          sx={{
            m: '5% 10%',
          }}
        >
          Краткое описание стека технологий, примененных для реализации приложения.
        </Typography>
      </Paper>
      <Paper elevation={9}>
        <Box sx={{ m: '0 5%' }}>
          <ul>
            <li>
              Регистрация
              <Typography variant="body2" component="div">
                После регистрации/авторизации появляется имя пользователя в хедере...
              </Typography>
            </li>

            <li>
              Posts
              <Typography variant="body2" component="div">
                Пользователь видит свои посты, может их изменять, удалять...
              </Typography>
              <Typography variant="body2" component="div">
                Реализовано хранилище кук-сессий и спинер при загрузке.
              </Typography>
            </li>

            <li>
              Запись в БД
              <Typography variant="body2" component="div">
                Все данные пользователей и посты записываются в БД.
              </Typography>
              <Typography variant="body2" component="div">
                СТЭК: Redux Toolkit, MUI, bcrypt.
              </Typography>
            </li>
          </ul>
        </Box>
      </Paper>
    </Box>
  );
}
