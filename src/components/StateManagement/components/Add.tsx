import { FC, useCallback } from 'react';

import { useCounter, ADD_ACTION } from '../StateManagement';
import cls from './Button.module.scss';

const Add: FC = () => {
  const counter = useCounter();

  const handleButtonClick = useCallback(() => {
    counter.dispatch(ADD_ACTION);
  }, [counter]);

  return (
    <button className={cls.button} onClick={handleButtonClick}>
      Add +
    </button>
  );
};

export default Add;
