import React from 'react';
import Home from './pages/Home';

import {RelayEnvironmentProvider} from 'react-relay';

import RelayEnv from './services/RelayEnv';

const App = () => {
  return (
    <RelayEnvironmentProvider environment={RelayEnv}>
      <Home />
    </RelayEnvironmentProvider>
  );
};

export default App;
