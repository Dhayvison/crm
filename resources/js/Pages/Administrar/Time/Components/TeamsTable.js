import * as React from 'react';
import { Table, Text } from 'bumbag';
import DeleteModelDialog from '@/Components/DeleteModelDialog';
import UpdateTeamModalForm from './UpdateTeamModalForm';

export default function TeamsTable({ teams }) {
  return (
    <Table isResponsive isStriped marginY='major-2'>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Nome</Table.HeadCell>
          <Table.HeadCell>Descrição</Table.HeadCell>
          <Table.HeadCell>Registro</Table.HeadCell>
          <Table.HeadCell>Última atualização</Table.HeadCell>
          <Table.HeadCell textAlign='center'>Ações</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {teams.map((team) => (
          <Table.Row key={team.id}>
            <Table.Cell>{team.id}</Table.Cell>
            <Table.Cell>
              <Text use='strong'>{team.name}</Text>
            </Table.Cell>
            <Table.Cell maxWidth='500px'>{team.description}</Table.Cell>
            <Table.Cell>{new Date(team.createdAt).toLocaleString()}</Table.Cell>
            <Table.Cell>{new Date(team.updatedAt).toLocaleString()}</Table.Cell>
            <Table.Cell textAlign='center'>
              <UpdateTeamModalForm team={team} />
              <DeleteModelDialog
                deleteRoute={route('teams.delete', { id: team.id })}
                modelName={team.name}
                title='Deletar Time'
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
