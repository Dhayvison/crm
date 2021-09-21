import React from 'react';
import { Flex } from 'bumbag';
import Authenticated from '@/Layouts/Authenticated';
import Pagination from '@/Components/Pagination';

import CreateRoleModalForm from './Components/CreateRoleModalForm';
import RolesTable from './Components/RolesTable';

export default function Index(props) {
  const { auth, errors } = props;
  const { roles } = props;
  const { data, meta } = roles;

  return (
    <Authenticated auth={auth} errors={errors} header='Cargos'>
      <Flex alignX='right' justifyContent='space-between'>
        <Pagination meta={meta} route={route('administrar.cargos')} />
        <CreateRoleModalForm />
      </Flex>
      <RolesTable roles={data} />
    </Authenticated>
  );
}
