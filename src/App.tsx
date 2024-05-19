import './styles/normalize.css';
import './styles/variables.css';
import './styles/global.css';
import NotFound from '@pages/not-found';
import Header from './components/header';

function App() {
  return (
    <>
      <Header isAuth={true} theme={'dark'} />
      <NotFound />
    </>
  );
}

export default App;
