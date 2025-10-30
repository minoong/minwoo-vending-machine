import { createContext } from 'react';
import type { VendingMachineAction, VendingMachineState } from '~/providers/reducers/types';

export const VendingMachineContext = createContext<
  | {
      state: VendingMachineState;
      dispatch: React.Dispatch<VendingMachineAction>;
    }
  | undefined
>(undefined);
