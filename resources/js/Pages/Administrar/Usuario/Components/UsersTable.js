import * as React from 'react';
import { Table } from 'bumbag';
import moment from 'moment';
import DeleteUserDialog from './DeleteUserDialog';
import UpdateUserModalForm from './UpdateUserModalForm';

export default function UsersTable({ users, authUserId }) {
  return (
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
              <UpdateUserModalForm user={user} />
              <DeleteUserDialog user={user} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
