import React from 'react';
import AppNavigator from './src/navigation-screens';
import BaseAppInitializer from './src/components/common/BaseAppInitializer';

export default function App() {
  return (
    <BaseAppInitializer>
      <AppNavigator />
    </BaseAppInitializer>
  );
}