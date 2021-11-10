// Import modules...
import React from 'react';
import { render } from 'react-dom';
import { App } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { Provider as BumbagProvider, ToastManager } from 'bumbag';
import moment from 'moment';
import momentConfig from './Utils/moment-pt-BR-config';
import { theme, getSystemDefaultTheme } from './Utils/theme';

require('./bootstrap');

moment.defineLocale('pt-br', momentConfig);

const el = document.getElementById('app');

render(
  <BumbagProvider theme={theme} colorMode={getSystemDefaultTheme()}>
    <App
      initialPage={JSON.parse(el.dataset.page)}
      resolveComponent={(name) => require(`./Pages/${name}`).default}
    />
    <ToastManager placeItems='bottom' />
  </BumbagProvider>,
  el
);

InertiaProgress.init({
  color:
    'linear-gradient(-45deg, rgba(87,79,235,1), rgba(30,103,213,1), rgba(59,130,246,1), rgba(124,58,237,1))',
});
