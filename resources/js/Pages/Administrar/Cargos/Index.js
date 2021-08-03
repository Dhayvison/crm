import React from 'react';
import { Button, Flex, Modal, Table } from 'bumbag';
import Authenticated from '@/Layouts/Authenticated';
import { InertiaLink } from '@inertiajs/inertia-react';
import Create from './Create';

export default function Index(props) {
  const { auth, errors } = props;
  const { roles } = props;

  React.useEffect(() => {
    document.title = 'Cargos';
  }, []);

  return (
    <Authenticated auth={auth} errors={errors} header='Cargos'>
      <Flex alignX='right'>
        <Create />
      </Flex>

      <Table isResponsive isStriped marginTop='major-2'>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell textAlign='center'>Salário</Table.HeadCell>
            <Table.HeadCell>Registro</Table.HeadCell>
            <Table.HeadCell>Última atualização</Table.HeadCell>
            {/* <Table.HeadCell textAlign='center'>Ações</Table.HeadCell> */}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {roles.map((role) => (
            <Table.Row key={role.id}>
              <Table.Cell>{role.id}</Table.Cell>
              <Table.Cell>{role.name}</Table.Cell>
              <Table.Cell textAlign='center'>{role.wages}</Table.Cell>
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
    </Authenticated>
  );
}
