import * as React from 'react';
import { Button, Modal, Table, Text } from 'bumbag';
import Icon from '@/Components/Icon';
import UpdateDepartmentModalForm from './UpdateDepartmentModalForm';
import DeleteDepartmentDialog from './DeleteDepartmentDialog';

export default function DepartmentsTable({ departments }) {
  const [selectedDepartment, setSelectedDepartment] = React.useState();

  const deleteModal = Modal.useState();
  const deleteModalDisclosureProps = Modal.Disclosure.useProps({ ...deleteModal });

  const updateModal = Modal.useState();
  const updateModalDisclosureProps = Modal.Disclosure.useProps({ ...updateModal });
  return (
    <>
      <UpdateDepartmentModalForm department={selectedDepartment} modalProps={updateModal} />
      <DeleteDepartmentDialog department={selectedDepartment} modalProps={deleteModal} />
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
          {departments.map((department) => (
            <Table.Row key={department.id}>
              <Table.Cell>{department.id}</Table.Cell>
              <Table.Cell>
                <Text use='strong'>{department.name}</Text>
              </Table.Cell>
              <Table.Cell maxWidth='500px'>{department.description}</Table.Cell>
              <Table.Cell>{new Date(department.createdAt).toLocaleString()}</Table.Cell>
              <Table.Cell>{new Date(department.updatedAt).toLocaleString()}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Button
                  variant='ghost'
                  borderRadius='7'
                  {...updateModalDisclosureProps}
                  onClick={() => {
                    setSelectedDepartment(department);
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
                    setSelectedDepartment(department);
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
