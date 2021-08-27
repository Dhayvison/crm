import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import { Avatar, Button, FieldStack, Flex } from 'bumbag';
import Pagination from '@/Components/Pagination';
import Input from '@/Components/StyledInput';
import UsersTable from './Components/UsersTable';

export default function Index(props) {
  const { auth, errors } = props;
  const { users } = props;
  const { data, meta } = users;
  const {
    data: formData,
    setData,
    put,
  } = useForm({
    name: auth.user.name,
    email: auth.user.email,
  });

  React.useEffect(() => {
    document.title = 'Usuários';
  }, []);

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  return (
    <Authenticated auth={auth} errors={errors} header='Usuários'>
      <Flex alignItems='center' marginBottom='major-4'>
        <Avatar
          src='https://thispersondoesnotexist.com/image'
          variant='circle'
          size='large'
          alt={auth.user.name}
        />

        <FieldStack marginLeft='major-4' use='form'>
          <Input
            type='text'
            name='name'
            value={formData.name}
            autoComplete='name'
            handleChange={onHandleChange}
            required
            inputProps={{
              variant: 'borderless',
              inputProps: {
                background: 'transparent',
                fontSize: '3rem',
                fontWeight: 'bold',
                height: 'fit-content',
              },
            }}
          />

          <Input
            type='email'
            name='email'
            value={formData.email}
            autoComplete='username'
            handleChange={onHandleChange}
            required
            inputProps={{
              variant: 'borderless',
              inputProps: { background: 'transparent', fontSize: '2rem', height: 'fit-content' },
            }}
          />
        </FieldStack>
      </Flex>

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
