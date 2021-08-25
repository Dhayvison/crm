// Import modules...
import React from 'react';
import { render } from 'react-dom';
import { App } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { Provider as BumbagProvider } from 'bumbag';

require('./bootstrap');

const el = document.getElementById('app');

const theme = {
  Select: {
    styles: {
      base: {
        background: 'var(--bb-palette-default)',
      },
    },
    Icon: {
      styles: {
        base: {
          top: '0',
        },
      },
    },
  },
  FieldWrapper: {
    ValidationText: {
      styles: {
        base: {
          padding: 'minor-1',
          fontWeight: 'bold',
        },
      },
    },
  },
};

render(
  <BumbagProvider theme={theme}>
    <App
      initialPage={JSON.parse(el.dataset.page)}
      resolveComponent={(name) => require(`./Pages/${name}`).default}
    />
  </BumbagProvider>,
  el
);

InertiaProgress.init({
  color:
    'linear-gradient(-45deg, rgba(87,79,235,1), rgba(30,103,213,1), rgba(59,130,246,1), rgba(124,58,237,1))',
});
