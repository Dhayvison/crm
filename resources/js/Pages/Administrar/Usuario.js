import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
// import { InertiaLink } from '@inertiajs/inertia-react';
import { Table } from 'bumbag';

export default function Administrar(props) {
  const { users } = props;

  React.useEffect(()=>{
    console.log(users);
  }, [])

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={'Usuários'}
    >
      

      <Table isResponsive isStriped>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell textAlign="center">E-mail</Table.HeadCell>
            <Table.HeadCell>Registro</Table.HeadCell>
            <Table.HeadCell>Última atualização</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {users.map((user)=>{
            return (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell textAlign="center">{user.email}</Table.Cell>
                <Table.Cell>{new Date(user.createdAt).toLocaleString()}</Table.Cell>
                <Table.Cell>{new Date(user.updatedAt).toLocaleString()}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Authenticated>
  );
}
