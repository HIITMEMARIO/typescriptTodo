import { useEffect } from 'react';
import GlobalStyle from './GloabalStyle';
import Home from './components/Home';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addData } from './redux/modules/todos';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const data = async () => {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
      dispatch(addData(res.data));
    };
    data();
  });

  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
};

export default App;
