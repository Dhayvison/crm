import Authenticated from '@/Layouts/Authenticated';
import Input from '@/Components/StyledInput';
import ValidationErrors from '@/Components/ValidationErrors';
import React from 'react';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import { Button, Dialog, Flex, Modal, Stack, Table } from 'bumbag';

function DeleteUserDialog({ user }) {
  const modal = Modal.useState();
  const { processing, errors, delete: destroy } = useForm({});

  const submit = () => {
    destroy(route('user.delete', { id: user.id })).then(() => {
      modal.hide();
    });
  };

  return (
    <>
      <Modal.Disclosure
        use={React.forwardRef((props, ref) => (
          <Button innerRef={ref} variant='ghost' palette='danger' borderRadius='7' {...props} />
        ))}
        {...modal}
      >
        🗑
      </Modal.Disclosure>
      <Dialog.Modal
        showActionButtons
        actionButtonsProps={{
          submitProps: { isLoading: processing, palette: 'warning' },
          submitText: 'Sim, desativar',
          cancelText: 'Cancelar',
          onClickSubmit: submit,
        }}
        type='warning'
        title='Desativar usuário'
        {...modal}
      >
        Tem certeza que deseja desativar o usuário {user.name}?
        <ValidationErrors errors={errors} />
      </Dialog.Modal>
    </>
  );
}

function UpdateUserModal({ user }) {
  const modal = Modal.useState();
  const { data, setData, processing, errors, put } = useForm({
    name: user.name,
    email: user.email,
  });

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  const submit = () => {
    put(route('user.update', { id: user.id }), {
      onSuccess: () => {
        modal.hide();
      },
    });
  };

  return (
    <>
      <Modal.Disclosure
        use={React.forwardRef((props, ref) => (
          <Button innerRef={ref} variant='ghost' borderRadius='7' {...props} />
        ))}
        {...modal}
      >
        🖊
      </Modal.Disclosure>
      <Dialog.Modal
        showActionButtons
        actionButtonsProps={{
          submitProps: { isLoading: processing },
          submitText: 'Salvar',
          cancelText: 'Cancelar',
          onClickSubmit: submit,
        }}
        title='Editar usuário'
        {...modal}
      >
        <ValidationErrors errors={errors} />
        <form>
          <Stack spacing='major-4'>
            <Input
              type='text'
              name='name'
              label='Nome'
              value={data.name}
              autoComplete='name'
              isFocused
              handleChange={onHandleChange}
              required
            />

            <Input
              type='email'
              name='email'
              label='E-mail'
              value={data.email}
              autoComplete='username'
              handleChange={onHandleChange}
              required
            />
          </Stack>
        </form>
        <ValidationErrors errors={errors} />
      </Dialog.Modal>
    </>
  );
}

export default function Index(props) {
  const { auth, errors } = props;
  const { users } = props;

  React.useEffect(() => {
    document.title = 'Usuários';
  }, []);

  return (
    <Authenticated auth={auth} errors={errors} header='Usuários'>
      <Flex alignX='right'>
        <Button
          palette='primary'
          use={(prop) => <InertiaLink href={route('register')} {...prop} />}
        >
          Novo usuário
        </Button>
      </Flex>

      <Table isResponsive isStriped marginTop='major-2'>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell textAlign='center'>E-mail</Table.HeadCell>
            <Table.HeadCell>Registro</Table.HeadCell>
            <Table.HeadCell>Última atualização</Table.HeadCell>
            <Table.HeadCell textAlign='center'>Ações</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {users.map((user) => (
            <Table.Row
              key={user.id}
              {...(user.id === props.auth.user.id && {
                backgroundColor: 'primary',
                color: 'white',
              })}
            >
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell textAlign='center'>{user.email}</Table.Cell>
              <Table.Cell>{new Date(user.createdAt).toLocaleString()}</Table.Cell>
              <Table.Cell>{new Date(user.updatedAt).toLocaleString()}</Table.Cell>
              <Table.Cell textAlign='center'>
                <UpdateUserModal user={user} />
                <DeleteUserDialog user={user} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Authenticated>
  );
}
