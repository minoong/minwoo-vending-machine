import { useContext } from 'react';
import { VendingMachineContext } from '~/providers/vending-machine/lib/context';

export const useVendingMachine = () => {
  const context = useContext(VendingMachineContext);

  if (!context) {
    throw new Error('useVendingMachine must be used within VendingMachineProvider');
  }

  return context;
};
