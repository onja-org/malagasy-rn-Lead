import React, {useCallback, useEffect, useState} from 'react';

import App from './App';

const Root = () => {
  const [storybookActive, setStorybookActive] = useState(false);
  const toggleStorybook = useCallback(
    () => setStorybookActive(active => !active),
    [],
  );

  useEffect(() => {
    if (__DEV__) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const DevMenu = require('react-native-dev-menu');
      DevMenu.addItem('Toggle Storybook', toggleStorybook);
    }
  }, [toggleStorybook]);

  return storybookActive ? <App /> : <App />;
};

export default Root;
