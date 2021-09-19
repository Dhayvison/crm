// Import modules...
import React from 'react';
import { render } from 'react-dom';
import { App } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { Provider as BumbagProvider, ToastManager } from 'bumbag';
import moment from 'moment';

require('./bootstrap');

moment.defineLocale('pt-br', {
  months:
    'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split(
      '_'
    ),
  monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
  weekdays: 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split(
    '_'
  ),
  weekdaysShort: 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
  weekdaysMin: 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY [às] LT',
    LLLL: 'dddd, D [de] MMMM [de] YYYY [às] LTS',
  },
  calendar: {
    sameDay: '[Hoje às] LT',
    nextDay: '[Amanhã às] LT',
    nextWeek: 'dddd [às] LT',
    lastDay: '[Ontem às] LT',
    lastWeek() {
      return this.day() === 0 || this.day() === 6
        ? '[Último] dddd [às] LT' // Saturday + Sunday
        : '[Última] dddd [às] LT'; // Monday - Friday
    },
    sameElse: 'L',
  },
  relativeTime: {
    future: 'em %s',
    past: '%s atrás',
    s: 'segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos',
  },
  ordinal: '%dº',
});

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
  Modal: {
    Backdrop: {
      styles: {
        base: {
          backdropFilter: 'blur(2px) grayscale(1)',
        },
      },
    },
  },
  Toast: {
    defaultProps: {
      accent: 'bottom',
      variant: 'bordered',
      className: 'shadow-lg',
    },
    timeout: 10000,
  },
};

render(
  <BumbagProvider theme={theme}>
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
