import * as React from 'react';
import { Button, Modal, Table, Text } from 'bumbag';
import DeleteModelDialog from '@/Components/DeleteModelDialog';
import Icon from '@/Components/Icon';
import UpdateTeamModalForm from './UpdateTeamModalForm';

export default function TeamsTable({ teams }) {
  const [selectedTeam, setSelectedTeam] = React.useState();

  const deleteModal = Modal.useState();
  const deleteModalDisclosureProps = Modal.Disclosure.useProps({ ...deleteModal });

  const updateModal = Modal.useState();
  const updateModalDisclosureProps = Modal.Disclosure.useProps({ ...updateModal });

  return (
    <>
      <UpdateTeamModalForm team={selectedTeam} modalProps={updateModal} />
      <DeleteModelDialog
        routeName='teams.delete'
        title='Deletar Time'
        model={selectedTeam}
        modalProps={deleteModal}
      />
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
                <Button
                  variant='ghost'
                  borderRadius='7'
                  {...updateModalDisclosureProps}
                  onClick={() => {
                    setSelectedTeam(team);
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
                    setSelectedTeam(team);
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
