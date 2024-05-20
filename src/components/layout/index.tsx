import { FC } from 'react';
import Header from '../header';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  return (
    <>
      <Header theme="dark" isAuth={false} />
      <Outlet />
    </>
  );
};

export default Layout;
