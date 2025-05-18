import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DotOnlineIcon from './icons_Chat/DotOnlineIcon';
import type { UserType } from '../../../../types/userTypes';

type UsersListTypeProps = {
  users: UserType[];
};

export default function UsersList({ users }: UsersListTypeProps): JSX.Element {
  return (
    <Box >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Онлайн пользователи
      </Typography>
      <List dense>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemIcon sx={{ minWidth: '25px' }}>
              <DotOnlineIcon />
            </ListItemIcon>
            <ListItemText primary={`${user.username} — online`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
