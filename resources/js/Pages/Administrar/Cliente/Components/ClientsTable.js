import * as React from 'react';
import { Button, Modal, Table, Text } from 'bumbag';
import DeleteModelDialog from '@/Components/DeleteModelDialog';
import Icon from '@/Components/Icon';

export default function ClientsTable({ clients }) {
  const [selectedClient, setSelectedClient] = React.useState();

  const deleteModal = Modal.useState();
  const deleteModalDisclosureProps = Modal.Disclosure.useProps({ ...deleteModal });

  return (
    <>
      <DeleteModelDialog
        routeName='clients.delete'
        title='Deletar cliente'
        model={selectedClient}
        modalProps={deleteModal}
      />
      <Table isResponsive isStriped marginY='major-2'>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell>E-mail</Table.HeadCell>
            <Table.HeadCell>Telefone</Table.HeadCell>
            <Table.HeadCell>Celular</Table.HeadCell>
            <Table.HeadCell textAlign='center'>Ações</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {clients.map((client) => (
            <Table.Row key={client.id}>
              <Table.Cell>{client.id}</Table.Cell>
              <Table.Cell>
                <Text use='strong'>{client.name}</Text>
              </Table.Cell>
              <Table.Cell>{client.email}</Table.Cell>
              <Table.Cell>{client.phone}</Table.Cell>
              <Table.Cell>{client.cellphone}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Button
                  variant='ghost'
                  palette='danger'
                  borderRadius='7'
                  {...deleteModalDisclosureProps}
                  onClick={() => {
                    setSelectedClient(client);
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
