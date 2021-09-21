import React from 'react';
import { Flex } from 'bumbag';
import Authenticated from '@/Layouts/Authenticated';
import Pagination from '@/Components/Pagination';

import CreateDepartmentModalForm from './Components/CreateDepartmentModalForm';
import DepartmentsTable from './Components/DepartmentsTable';

export default function Index(props) {
  const { auth, errors } = props;
  const { departments } = props;
  const { data, meta } = departments;

  return (
    <Authenticated auth={auth} errors={errors} header='Departamentos'>
      <Flex alignX='right' justifyContent='space-between'>
        <Pagination meta={meta} route={route('administrar.departamentos')} />
        <CreateDepartmentModalForm />
      </Flex>
      <DepartmentsTable departments={data} />
    </Authenticated>
  );
}
