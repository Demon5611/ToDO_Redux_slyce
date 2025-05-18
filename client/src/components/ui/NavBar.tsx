import { Link, Typography } from '@mui/material';
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

  if (user.status === 'loading') return <div>Loading...</div>;

  const links =
    user.status === 'logged'
      ? [
          { to: '/', name: 'Main' },
          { to: '/posts', name: 'ToDo' },
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
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Левый блок */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {links.map((link) => (
              <Link key={link.name} component={NavLink} to={link.to} sx={linkStyle}>
                {link.name}
              </Link>
            ))}
          </Box>

          {/* Правый блок: имя + Logout */}
          {user.status === 'logged' ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  color: 'white',
                  fontFamily: 'Raleway, Arial',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12px',
                }}
              >
                {user.username}
              </Typography>
              <Button
                variant="text"
                onClick={handleClick}
                sx={{
                  minWidth: 'auto',
                  padding: '4px 4px',
                  lineHeight: 1,
                  height: 'auto',
                  fontSize: '12px',
                  alignSelf: 'center',
                  ...linkStyle,
                }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Typography sx={{ color: 'white', fontFamily: 'Raleway, Arial' }}>
              guest, only authorized user can do
            </Typography>
          )}
        </Toolbar>
        <ModalLogOut handleClick={handleClick} open={open} />
      </AppBar>
    </Box>
  );
}
