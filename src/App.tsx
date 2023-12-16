import { useEffect } from 'react';
import GlobalStyle from './GloabalStyle';
import Home from './components/Home';
import { __getTodo } from './redux/modules/todos';
import { useAppDispatch } from './app/hooks';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(__getTodo());
  }, []);

  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
};

export default App;
