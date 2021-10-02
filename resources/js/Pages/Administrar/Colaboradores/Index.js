import * as React from 'react';
import { Flex } from 'bumbag';
import Authenticated from '@/Layouts/Authenticated';
import Pagination from '@/Components/Pagination';

import CreateEmployeeModalForm from './Components/CreateEmployeeModalForm';
import EmployeesTable from './Components/EmployeesTable';

export default function Index(props) {
  const { auth, errors } = props;
  const { employees, formData } = props;

  const { data, meta } = employees;

  return (
    <Authenticated auth={auth} errors={errors} header='Colaboradores'>
      <Flex alignX='right' justifyContent='space-between'>
        <Pagination meta={meta} route={route('administrar.colaboradores')} />

        <CreateEmployeeModalForm
          roles={formData.roles}
          departments={formData.departments}
          teams={formData.teams}
        />
      </Flex>
      <EmployeesTable
        employees={data}
        users={formData.users}
        roles={formData.roles}
        departments={formData.departments}
        teams={formData.teams}
      />
    </Authenticated>
  );
}
