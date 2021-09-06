import * as React from 'react';
import { Button, Modal, Table, Text } from 'bumbag';
import DeleteModelDialog from '@/Components/DeleteModelDialog';
import UpdateRoleModalForm from './UpdateRoleModalForm';

export default function RolesTable({ roles }) {
  const [selectedRole, setSelectedRole] = React.useState();

  const deleteModal = Modal.useState();
  const deleteModalDisclosureProps = Modal.Disclosure.useProps({ ...deleteModal });

  const updateModal = Modal.useState();
  const updateModalDisclosureProps = Modal.Disclosure.useProps({ ...updateModal });

  return (
    <>
      <UpdateRoleModalForm role={selectedRole} modalProps={updateModal} />
      <DeleteModelDialog
        routeName='roles.delete'
        title='Deletar Cargo'
        model={selectedRole}
        modalProps={deleteModal}
      />
      <Table isResponsive isStriped marginY='major-2'>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell>Salário</Table.HeadCell>
            <Table.HeadCell>Registro</Table.HeadCell>
            <Table.HeadCell>Última atualização</Table.HeadCell>
            <Table.HeadCell textAlign='center'>Ações</Table.HeadCell>
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
              <Table.Cell textAlign='center'>
                <Button
                  variant='ghost'
                  borderRadius='7'
                  {...updateModalDisclosureProps}
                  onClick={() => {
                    setSelectedRole(role);
                    updateModal.show();
                  }}
                >
                  🖊
                </Button>
                <Button
                  variant='ghost'
                  palette='danger'
                  borderRadius='7'
                  {...deleteModalDisclosureProps}
                  onClick={() => {
                    setSelectedRole(role);
                    deleteModal.show();
                  }}
                >
                  🗑
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
