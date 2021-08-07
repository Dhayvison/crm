import React from 'react';
import { Flex } from 'bumbag';
import Authenticated from '@/Layouts/Authenticated';
import Pagination from '@/Components/Pagination';

import CreateTeamModalForm from './Components/CreateTeamModalForm';
import TeamsTable from './Components/TeamsTable';

export default function Index(props) {
  const { auth, errors } = props;
  const { teams } = props;
  const { data, meta } = teams;

  React.useEffect(() => {
    document.title = 'Times';
  }, []);

  return (
    <Authenticated auth={auth} errors={errors} header='Times'>
      <Flex alignX='right' justifyContent='space-between'>
        <Pagination meta={meta} route={route('administrar.times')} />
        <CreateTeamModalForm />
      </Flex>
      <TeamsTable teams={data} />
    </Authenticated>
  );
}
