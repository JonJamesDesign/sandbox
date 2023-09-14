import { createContext, FC, useContext, useMemo, useReducer } from 'react';

import { Add, Subtract } from './components';
import { Action, ICounterContext, State } from './StateManagement.types';
import cls from './StateManagement.module.scss';

const CounterContext = createContext<ICounterContext | undefined>(undefined);

export const ADD_ACTION: Action = { type: 'add' };
export const SUBTRACT_ACTION: Action = { type: 'subtract' };

function counterReducer(state: State, action: Action) {
  switch (action.type) {
    case 'add':
      return { count: state.count + 1 };
    case 'subtract':
      return { count: state.count - 1 };
    default:
      throw new Error(`Unhandled action type`);
  }
}

const StateManagement: FC = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <CounterContext.Provider value={value}>
      <p>
        Count: <span className={cls.count}>{state.count}</span>
      </p>
      <div className={cls.controls}>
        <Subtract />
        <Add />
      </div>
    </CounterContext.Provider>
  );
};

export function useCounter() {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounter must be called within a CounterProvider');
  }
  return context;
}

export default StateManagement;
