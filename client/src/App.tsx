import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './components/pages/AdminPage';
import ChatPage from './components/pages/ChatPage';
import AuthPage from './components/pages/AuthPage';
import MainPage from './components/pages/MainPage';
import PostsPage from './components/pages/PostPages';
import NavBar from './components/ui/NavBar';
import Loader from './hocs/Loader';
import PrivateRoute from './hocs/PrivateRoute';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/user/UserThunks';
import type { MessageType } from './types/messageTypes';
import isLogged from './types/userGuards';

type AppTypeProps = {
  messages: MessageType[];
};

function App({ messages }: AppTypeProps): JSX.Element {
  const theme = createTheme({
    palette: {
      primary: { main: '#6a329f' },
    },
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);

  useEffect(() => {
    void dispatch(checkUserThunk());
  }, [dispatch]);

  const appStyles = {
    width: '50%',
    maxWidth: '750px',
    margin: '0 auto',
  };

  return (
    <ThemeProvider theme={theme}>
      <Loader isLoading={user.status === 'loading'}>
        <Container style={appStyles}>
          <NavBar />
          <Box mt={5}>
            <Routes>
              <Route path="/" element={<MainPage />} />

              <Route element={<PrivateRoute isAllowed={user.status === 'logged'} />}>
                <Route path="/posts" element={<PostsPage />} />
                <Route
                  path="/chat"
                  element={isLogged(user) ? <ChatPage messages={messages} user={user} /> : null}
                />
              </Route>

              <Route
                path="/admin"
                element={
                  <PrivateRoute isAllowed={user.status === 'logged' && user.username === 'admin'}>
                    <AdminPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/:auth"
                element={
                  <PrivateRoute isAllowed={user.status === 'guest'}>
                    <AuthPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
        </Container>
      </Loader>
    </ThemeProvider>
  );
}

export default App;
