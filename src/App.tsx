import { BrowserRouter } from 'react-router';
import './App.css';
import { Header } from '~/shared/ui/header';

function App() {
  return (
    <BrowserRouter>
      <Header title="🧃 자동 판매기" />
    </BrowserRouter>
  );
}

export default App;
