import './styles/normalize.css';
import './styles/variables.css';
import './styles/global.css';
import Header from '@components/header/';
import Authorization from '@pages/authorization/';

function App() {
  return (
    <>
      <Header isAuth={true} theme="dark" />
      <Authorization />
    </>
  );
}

export default App;
