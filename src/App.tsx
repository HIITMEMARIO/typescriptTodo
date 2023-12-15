import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './components/Home';
import GlobalStyle from '../src/GloabalStyle';
import 'sweetalert2/src/sweetalert2.scss';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Home />
    </QueryClientProvider>
  );
};

export default App;
