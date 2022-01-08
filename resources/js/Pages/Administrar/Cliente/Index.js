import * as React from 'react';
import { Flex } from 'bumbag';
import Authenticated from '@/Layouts/Authenticated';
import Pagination from '@/Components/Pagination';
import { appRoute } from '@/Utils/navigation';
import ClientsTable from './Components/ClientsTable';
import CreateClientModalForm from './Components/CreateClientModalForm';

export default function Index(props) {
  const { auth, errors } = props;
  const { clients } = props;

  const { data, meta } = clients;

  return (
    <Authenticated auth={auth} errors={errors} header='Clientes'>
      <Flex alignX='right' justifyContent='space-between'>
        <Pagination meta={meta} route={appRoute('administrar.clientes')} />
        <CreateClientModalForm />
      </Flex>
      <ClientsTable clients={data} />
    </Authenticated>
  );
}
