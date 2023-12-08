import React from 'react';
import { Stack } from 'react-bootstrap';
import DotOnlineIcon from './icons_Chat/DotOnlineIcon';
import type { UserType } from '../../../../types/userTypes';

type UsersListTypeProps = {
  users: UserType[];
};


export default function UsersList({ users }:UsersListTypeProps): JSX.Element {
  return (
    <Stack>
      {users.map((user) => (
        <div className="p-2" key={user.id}>
          <DotOnlineIcon />
          {user.name}
        </div>
      ))}
    </Stack>
  );
}
