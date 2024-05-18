import './styles/normalize.css';
import './styles/variables.css';
import './styles/global.css';
import Header from '@components/header/';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <>
      <Header isAuth={true} theme="dark" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
