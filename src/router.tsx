import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // {
      //   path: '/',
      //   element: <Main />,
      // },
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
      //   path: '/login',
      //   element: <Login />,
      // },
      // {
      //   path: '/sign-up',
      //   element: <SignUp />,
      // },
      // {
      //   path: '*',
      //   element: <NotFound />
      // },
    ],
  },
]);
