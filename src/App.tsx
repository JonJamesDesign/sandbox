import React, {
  useState,
  Suspense,
  useCallback,
  ChangeEventHandler,
} from 'react';

import cls from './App.module.scss';

const DataFetcher = React.lazy(
  () => import('./components/DataFetcher/DataFetcher')
);
const StateManagement = React.lazy(
  () => import('./components/StateManagement/StateManagement')
);
const ComplexComponent = React.lazy(
  () => import('./components/ComplexComponent/ComplexComponent')
);

const COMPONENT_NAMES = [
  'DataFetcher',
  'StateManagement',
  'ComplexComponent',
] as const;
type ComponentNameTuple = typeof COMPONENT_NAMES;
type ComponentName = ComponentNameTuple[number];

const componentsMap: {
  [key in ComponentName]: React.LazyExoticComponent<React.FC>;
} = {
  DataFetcher,
  StateManagement,
  ComplexComponent,
};

const Loading = () => <p>Loading&hellip;</p>;

function App() {
  const [activeComponentName, setActiveComponentName] =
    useState<ComponentName>('DataFetcher');

  const ActiveComponent = componentsMap[activeComponentName];

  const handleComponentSelectChange = useCallback<
    ChangeEventHandler<HTMLSelectElement>
  >((e) => {
    setActiveComponentName(e.target.value as ComponentName);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className={cls.app}>
        <form>
          <label htmlFor="component-selector">Select component:</label>
          <select
            id="component-selector"
            value={activeComponentName}
            onChange={handleComponentSelectChange}
          >
            {COMPONENT_NAMES.map((componentName) => (
              <option value={componentName}>{componentName}</option>
            ))}
          </select>
        </form>
        <ActiveComponent />
      </div>
    </Suspense>
  );
}

export default App;
