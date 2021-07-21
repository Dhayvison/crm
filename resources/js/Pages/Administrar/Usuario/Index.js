import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Button, Flex, Table } from 'bumbag';

export default function Administrar(props) {
  const { users } = props;

  React.useEffect(()=>{
    document.title = "Usuários"
  }, [])

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={'Usuários'}
    >
      <Flex alignX="right">
        <Button 
          palette="primary"
          use={(props)=> <InertiaLink href={route('register')} {...props}/>}
        >
          Novo usuário
        </Button>
      </Flex>

      <Table isResponsive isStriped marginTop='major-2'>
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
          {users.map((user)=>{
            return (
              <Table.Row 
                key={user.id}
                {...(user.id === props.auth.user.id && {
                  backgroundColor: "primary",
                  color: 'white'
                })}
              >
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell textAlign="center">{user.email}</Table.Cell>
                <Table.Cell>{new Date(user.createdAt).toLocaleString()}</Table.Cell>
                <Table.Cell>{new Date(user.updatedAt).toLocaleString()}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    variant='ghost' 
                    borderRadius='7' 
                    use={(props)=> <InertiaLink href={route('administrar.usuarios')} {...props}/>}
                  >
                    🖊
                  </Button>
                  <Button variant='ghost' palette="danger" borderRadius='7'>🗑</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </Authenticated>
  );
}
