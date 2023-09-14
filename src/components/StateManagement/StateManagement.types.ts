export type Action = { type: 'add' } | { type: 'subtract' };

export type Dispatch = (action: Action) => void;

export type State = { count: number };

export interface ICounterContext {
  state: State;
  dispatch: Dispatch;
}
