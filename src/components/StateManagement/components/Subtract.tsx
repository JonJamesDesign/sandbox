import { FC, useCallback } from 'react';

import { useCounter, SUBTRACT_ACTION } from '../StateManagement';
import cls from './Button.module.scss';

const Subtract: FC = () => {
  const counter = useCounter();

  const handleButtonClick = useCallback(() => {
    counter.dispatch(SUBTRACT_ACTION);
  }, [counter]);

  return (
    <button className={cls.button} onClick={handleButtonClick}>
      Subtract -
    </button>
  );
};

export default Subtract;
