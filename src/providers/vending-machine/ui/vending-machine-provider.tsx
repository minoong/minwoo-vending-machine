import { useReducer, type ReactNode } from 'react';
import { VendingMachineContext } from '~/providers/vending-machine/lib/context';
import { initialState, vendingMachineReducer } from '~/providers/vending-machine/lib/reducer';

interface VendingMachineProviderProps {
  children: ReactNode;
}

export function VendingMachineProvider(props: VendingMachineProviderProps) {
  const { children } = props;

  const [state, dispatch] = useReducer(vendingMachineReducer, initialState);

  console.log({ state });

  return <VendingMachineContext.Provider value={{ state, dispatch }}>{children}</VendingMachineContext.Provider>;
}
