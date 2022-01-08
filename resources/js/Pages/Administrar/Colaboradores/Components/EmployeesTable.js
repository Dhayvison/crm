import * as React from 'react';
import { Button, Modal, Table, Text } from 'bumbag';
import DeleteModelDialog from '@/Components/DeleteModelDialog';
import Icon from '@/Components/Icon';
import { InertiaLink } from '@inertiajs/inertia-react';
import { appRoute } from '@/Utils/navigation';

export default function EmployeesTable({ employees }) {
  const [selectedEmployee, setSelectedEmployee] = React.useState();

  const deleteModal = Modal.useState();
  const deleteModalDisclosureProps = Modal.Disclosure.useProps({ ...deleteModal });

  return (
    <>
      <DeleteModelDialog
        routeName='employees.delete'
        title='Deletar colaborador'
        model={selectedEmployee && { id: selectedEmployee.id, name: selectedEmployee.fullName }}
        modalProps={deleteModal}
      />
      <Table isResponsive isStriped marginY='major-2'>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell>Cargo</Table.HeadCell>
            <Table.HeadCell>Time</Table.HeadCell>
            <Table.HeadCell>Departamento</Table.HeadCell>
            <Table.HeadCell textAlign='center'>Ações</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {employees.map((employee) => (
            <Table.Row key={employee.id}>
              <Table.Cell>{employee.id}</Table.Cell>
              <Table.Cell>
                <Text use='strong'>{employee.fullName}</Text>
              </Table.Cell>
              <Table.Cell>{employee.role.name}</Table.Cell>
              <Table.Cell>{employee.team.name}</Table.Cell>
              <Table.Cell>{employee.department.name}</Table.Cell>
              <Table.Cell textAlign='center'>
                <InertiaLink href={appRoute('colaboradores.editar', employee.id)}>
                  <Button variant='ghost' borderRadius='7'>
                    <Icon name='edit' />
                  </Button>
                </InertiaLink>
                <Button
                  variant='ghost'
                  palette='danger'
                  borderRadius='7'
                  {...deleteModalDisclosureProps}
                  onClick={() => {
                    setSelectedEmployee(employee);
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
