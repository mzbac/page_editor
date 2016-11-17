import React from 'react';

import components from './componentsMapper';

export default (data) => {
  if (!data || !data.componentName) {
    return null;
  }

  return React.createElement(components.get(data.componentName).component, data);
};