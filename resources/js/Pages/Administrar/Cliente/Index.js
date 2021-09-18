import * as React from 'react';
import { Flex } from 'bumbag';
import Authenticated from '@/Layouts/Authenticated';
import Pagination from '@/Components/Pagination';
import ClientsTable from './Components/ClientsTable';

export default function Index(props) {
  const { auth, errors } = props;
  const { clients, formData } = props;

  const { data, meta } = clients;

  React.useEffect(() => {
    document.title = 'Colaboradores';
  }, []);

  return (
    <Authenticated auth={auth} errors={errors} header='Clientes'>
      <Flex alignX='right' justifyContent='space-between'>
        <Pagination meta={meta} route={route('administrar.clientes')} />
      </Flex>
      <ClientsTable clients={data} />
    </Authenticated>
  );
}
