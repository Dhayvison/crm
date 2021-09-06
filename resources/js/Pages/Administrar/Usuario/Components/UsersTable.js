import * as React from 'react';
import { Button, Modal, Table } from 'bumbag';
import moment from 'moment';
import Icon from '@/Components/Icon';
import DeleteUserDialog from './DeleteUserDialog';
import UpdateUserModalForm from './UpdateUserModalForm';

export default function UsersTable({ users, authUserId }) {
  const [selectedUser, setSelectedUser] = React.useState();

  const deleteModal = Modal.useState();
  const deleteModalDisclosureProps = Modal.Disclosure.useProps({ ...deleteModal });

  const updateModal = Modal.useState();
  const updateModalDisclosureProps = Modal.Disclosure.useProps({ ...updateModal });

  return (
    <>
      <DeleteUserDialog user={selectedUser} modalProps={deleteModal} />
      <UpdateUserModalForm user={selectedUser} modalProps={updateModal} />

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
              {...(user.id === authUserId && {
                backgroundColor: 'primary',
                color: 'white',
              })}
            >
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell textAlign='center'>{user.email}</Table.Cell>
              <Table.Cell>{new Date(user.createdAt).toLocaleString()}</Table.Cell>
              <Table.Cell>{moment(user.updatedAt).fromNow()}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Button
                  variant='ghost'
                  borderRadius='7'
                  {...updateModalDisclosureProps}
                  onClick={() => {
                    setSelectedUser(user);
                    updateModal.show();
                  }}
                >
                  <Icon name='edit' />
                </Button>
                <Button
                  variant='ghost'
                  palette='danger'
                  borderRadius='7'
                  {...deleteModalDisclosureProps}
                  onClick={() => {
                    setSelectedUser(user);
                    deleteModal.show();
                  }}
                >
                  <Icon name='delete' />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
