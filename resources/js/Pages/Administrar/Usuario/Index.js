import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Button, Flex } from 'bumbag';
import Pagination from '@/Components/Pagination';
import UsersTable from './Components/UsersTable';
import { CurrentUserForm } from './Components/CurrentUserForm';

export default function Index(props) {
  const { auth, errors } = props;
  const { users } = props;
  const { data, meta } = users;

  React.useEffect(() => {
    document.title = 'Usuários';
  }, []);

  return (
    <Authenticated auth={auth} errors={errors} header='Usuários'>
      <CurrentUserForm user={auth.user} />
      <Flex alignX='right' justifyContent='space-between'>
        <Pagination meta={meta} route={route('administrar.usuarios')} />
        <Button
          palette='primary'
          use={(prop) => <InertiaLink href={route('register')} {...prop} />}
        >
          Novo usuário
        </Button>
      </Flex>

      <UsersTable users={data} authUserId={auth.user.id} />
    </Authenticated>
  );
}
