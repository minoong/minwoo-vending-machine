import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { Header } from '~/shared/ui/header';
import { VendingMachineProvider } from '~/providers/vending-machine/ui/vending-machine-provider';
import { PaymentSelectionPage } from '~/pages/payment-selection-page';
import { CashInsertPage } from '~/pages/cash-insert-page';
import { ProductSelectionPage } from '~/pages/product-selection-page';
import { ProcessingPage } from '~/pages/processing-page';
import { CompletionPage } from '~/pages/completion-page';

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
                <Route path="/product" element={<ProductSelectionPage />} />
                <Route path="/processing" element={<ProcessingPage />} />
                <Route path="/dispensing" element={<ProcessingPage />} />
                <Route path="/returning" element={<ProcessingPage />} />
                <Route path="/completed" element={<CompletionPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </VendingMachineProvider>
    </BrowserRouter>
  );
}

export default App;
