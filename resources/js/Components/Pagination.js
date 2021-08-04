import * as React from 'react';
import { Pagination } from 'bumbag';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ meta }) {
  const { current_page: current, last_page: lastPage } = meta;
  const [currentPage] = React.useState(current);

  return (
    <Pagination
      nextText='Próxima'
      previousText='Anterior'
      prepositionText='de'
      currentPage={currentPage}
      onChangePage={(page) => {
        Inertia.get(route('administrar.cargos', { page }));
      }}
      numberOfPages={lastPage}
    />
  );
}
