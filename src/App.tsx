import { BrowserRouter } from 'react-router';
import './App.css';
import { Header } from '~/shared/ui/header';
import { VendingMachineProvider } from '~/providers/vending-machine/ui/vending-machine-provider';

function App() {
  return (
    <BrowserRouter>
      <VendingMachineProvider>
        <Header title="🧃 자동 판매기" />
      </VendingMachineProvider>
    </BrowserRouter>
  );
}

export default App;
