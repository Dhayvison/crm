import * as React from 'react';
import { Flex } from 'bumbag';
import Authenticated from '@/Layouts/Authenticated';
import Pagination from '@/Components/Pagination';

import CreateEmployeeModalForm from './Components/CreateEmployeeModalForm';

export default function Index(props) {
  const { auth, errors } = props;
  const { employees, formData } = props;

  const { data, meta } = employees;
  console.log(data);

  React.useEffect(() => {
    document.title = 'Colaboradores';
  }, []);

  return (
    <Authenticated auth={auth} errors={errors} header='Colaboradores'>
      <Flex alignX='right' justifyContent='space-between'>
        <Pagination meta={meta} route={route('administrar.colaboradores')} />

        <CreateEmployeeModalForm
          users={formData.users}
          roles={formData.roles}
          departments={formData.departments}
          teams={formData.teams}
        />
      </Flex>
    </Authenticated>
  );
}
