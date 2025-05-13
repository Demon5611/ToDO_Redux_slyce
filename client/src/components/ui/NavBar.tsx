import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { Link as NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import ModalLogOut from './ModalLogOut';

const linkStyle = { color: 'white', mr: 2, fontFamily: 'Raleway, Arial' };

export default function NavBar(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const [open, setOpen] = React.useState(false);
  const handleClick = (): void => {
    setOpen((prev) => !prev);
  };

  if (user.status === 'loading') return <div>Loading...</div>; // <--- важно

  const links =
    user.status === 'logged'
      ? [
          { to: '/', name: 'Main' },
          { to: '/posts', name: 'Posts' },
          { to: '/chat', name: 'Chat' },
          { to: '/admin', name: 'Admin' },
        ]
      : [
          { to: '/', name: 'Main' },
          { to: '/signup', name: 'Registration' },
          { to: '/login', name: 'Login' },
        ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box>
            {links.map((link) => (
              <Link key={link.name} component={NavLink} to={link.to} sx={linkStyle}>
                {link.name}
              </Link>
            ))}
            <div>
              {user.status === 'logged' ? user.username : 'guest, only authorized user can do'}
            </div>
          </Box>
          <Box>
            {user.status === 'logged' && (
              <Button variant="text" sx={linkStyle} onClick={handleClick}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
        <ModalLogOut handleClick={handleClick} open={open} />
      </AppBar>
    </Box>
  );
}
