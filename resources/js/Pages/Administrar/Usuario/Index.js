import Authenticated from '@/Layouts/Authenticated';
import ValidationErrors from '@/Components/ValidationErrors';
import React from 'react';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import { Button, Dialog, Flex, Modal, Table } from 'bumbag';

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
      <Modal.Disclosure use={Button} variant='ghost' palette='danger' borderRadius='7' {...modal}>
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
                <Button
                  variant='ghost'
                  borderRadius='7'
                  use={(prop) => <InertiaLink href={route('administrar.usuarios')} {...prop} />}
                >
                  🖊
                </Button>
                <DeleteUserDialog user={user} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Authenticated>
  );
}
