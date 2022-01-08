import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Button, Flex } from 'bumbag';
import Pagination from '@/Components/Pagination';
import Icon from '@/Components/Icon';
import { appRoute } from '@/Utils/navigation';
import UsersTable from './Components/UsersTable';
import { CurrentUserForm } from './Components/CurrentUserForm';

export default function Index(props) {
  const { auth, errors } = props;
  const { users } = props;
  const { data, meta } = users;

  return (
    <Authenticated auth={auth} errors={errors} header='Usuários'>
      <CurrentUserForm user={auth.user} />
      <Flex alignX='right' justifyContent='space-between'>
        <Pagination meta={meta} route={appRoute('administrar.usuarios')} />
        <Button
          palette='primary'
          use={(prop) => <InertiaLink href={appRoute('register')} {...prop} />}
        >
          <Icon name='person_add' spacing={1} /> Novo usuário
        </Button>
      </Flex>

      <UsersTable users={data} authUserId={auth.user.id} />
    </Authenticated>
  );
}
