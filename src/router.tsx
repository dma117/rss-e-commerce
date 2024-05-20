import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout';
import Main from './pages/main';
import Login from './pages/login';
import SignUp from './pages/sign-up';
import CheckAuth from './components/checkAuth';
import UserContextProvider from './contexts/userContext';
import ApiRootContextProvider from './contexts/apiRootContext';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ApiRootContextProvider>
        <UserContextProvider>
          <Layout />
        </UserContextProvider>
      </ApiRootContextProvider>
    ),
    children: [
      {
        path: '/',
        element: <Main />,
      },
      // {
      //   path: '/courses',
      //   element: <Courses />,
      // },
      // {
      //   path: '/about-us',
      //   element: <AboutUs />,
      // },
      // {
      //   path: '/Cart',
      //   element: <Cart />,
      // },
      // {
      //   path: '/profile',
      //   element: <Profile />,
      // },
      // {
      //   path: '*',
      //   element: <NotFound />
      // },
    ],
  },
  {
    path: '/',
    element: (
      <ApiRootContextProvider>
        <UserContextProvider>
          <CheckAuth>
            <Layout />
          </CheckAuth>
        </UserContextProvider>
      </ApiRootContextProvider>
    ),
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
]);
