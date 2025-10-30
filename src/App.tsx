import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { Header } from '~/shared/ui/header';
import { VendingMachineProvider } from '~/providers/vending-machine/ui/vending-machine-provider';
import { PaymentSelectionPage } from '~/pages/payment-selection-page';
import { CashInsertPage } from '~/pages/cash-insert-page';

function App() {
  return (
    <BrowserRouter>
      <VendingMachineProvider>
        <div className="min-h-screen">
          <Header title="🧃 자동 판매기" />

          <div className="flex items-center justify-center p-3">
            <div className="w-full">
              <Routes>
                <Route index element={<PaymentSelectionPage />} />
                <Route path="/cash/insert" element={<CashInsertPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </VendingMachineProvider>
    </BrowserRouter>
  );
}

export default App;
