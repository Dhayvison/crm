import * as React from 'react';
import { Table, Text } from 'bumbag';

export default function RolesTable({ roles }) {
  return (
    <Table isResponsive isStriped marginY='major-2'>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Nome</Table.HeadCell>
          <Table.HeadCell>Salário</Table.HeadCell>
          <Table.HeadCell>Registro</Table.HeadCell>
          <Table.HeadCell>Última atualização</Table.HeadCell>
          {/* <Table.HeadCell textAlign='center'>Ações</Table.HeadCell> */}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {roles.map((role) => (
          <Table.Row key={role.id}>
            <Table.Cell>{role.id}</Table.Cell>
            <Table.Cell>
              <Text use='strong'>{role.name}</Text>
            </Table.Cell>
            <Table.Cell>
              {role.wages.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            </Table.Cell>
            <Table.Cell>{new Date(role.createdAt).toLocaleString()}</Table.Cell>
            <Table.Cell>{new Date(role.updatedAt).toLocaleString()}</Table.Cell>
            {/* <Table.Cell textAlign='center'>
                <UpdateUserModal user={role} />
                <DeleteUserDialog user={role} />
              </Table.Cell> */}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
