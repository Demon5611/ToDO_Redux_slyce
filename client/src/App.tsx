import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PostsPage from './components/pages/PostPages';
import AuthPage from './components/pages/AuthPage';
import NavBar from './components/ui/NavBar';
import MainPage from './components/pages/MainPage';
import AdminPage from './components/pages/AdminPage';
import AnotherPage from './components/pages/AnotherPage';
import PrivateRoute from './hocs/PrivateRoute';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/user/UserThunks';
import Loader from './hocs/Loader';

function App(): JSX.Element {
  const theme = createTheme({
    palette: {
      primary: { main: '#6a329f' },
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
  void  dispatch(checkUserThunk());
  }, []);

  const user = useAppSelector((store) => store.user);

  return (
    <ThemeProvider theme={theme}>
      <Loader isLoading={user.status === 'loading'}>
        <>
          <NavBar />
          <Box mt={5}>
            <Container>
              <Routes>
                <Route path="/" element={<MainPage />} />

                <Route element={<PrivateRoute isAllowed={user.status === 'logged'} />}>
                  <Route path="/posts" element={<PostsPage />} />
                  <Route path="/another" element={<AnotherPage />} />
                </Route>

                <Route
                  path="/admin"
                  element={
                    <PrivateRoute isAllowed={user.status === 'logged' || user.username === 'admin'}>
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
            </Container>
          </Box>
        </>
      </Loader>
    </ThemeProvider>
  );
}

export default App;
