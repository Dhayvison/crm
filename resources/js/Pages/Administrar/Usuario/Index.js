import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Button, Dialog, Flex, Modal, Table } from 'bumbag';

export default function Index(props) {
  const { auth, errors } = props;
  const { users } = props;

  React.useEffect(() => {
    document.title = 'Usuários';
  }, []);

  return (
    <Authenticated auth={auth} errors={errors} header="Usuários">
      <Flex alignX="right">
        <Button
          palette="primary"
          use={(prop) => <InertiaLink href={route('register')} {...prop} />}
        >
          Novo usuário
        </Button>
      </Flex>

      <Table isResponsive isStriped marginTop="major-2">
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell textAlign="center">E-mail</Table.HeadCell>
            <Table.HeadCell>Registro</Table.HeadCell>
            <Table.HeadCell>Última atualização</Table.HeadCell>
            <Table.HeadCell textAlign="center">Ações</Table.HeadCell>
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
              <Table.Cell textAlign="center">{user.email}</Table.Cell>
              <Table.Cell>{new Date(user.createdAt).toLocaleString()}</Table.Cell>
              <Table.Cell>{new Date(user.updatedAt).toLocaleString()}</Table.Cell>
              <Table.Cell textAlign="center">
                <Button
                  variant="ghost"
                  borderRadius="7"
                  use={(prop) => <InertiaLink href={route('administrar.usuarios')} {...prop} />}
                >
                  🖊
                </Button>

                <Modal.State>
                  <Dialog.Modal
                    showActionButtons
                    actionButtonsProps={{
                      submitProps: { palette: 'danger' },
                      cancelText: 'Cancelar',
                      submitText: 'Sim, desativar',
                      onClickSubmit: () => console.log('submitted'),
                      onClickCancel: () => console.log('cancel'),
                    }}
                    type="danger"
                    variant="alert"
                    title="Desativar usuário"
                  >
                    Tem certeza que deseja desativar o usuário {user.name}?
                  </Dialog.Modal>
                  <Modal.Disclosure use={Button} variant="ghost" palette="danger" borderRadius="7">
                    🗑
                  </Modal.Disclosure>
                </Modal.State>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Authenticated>
  );
}
