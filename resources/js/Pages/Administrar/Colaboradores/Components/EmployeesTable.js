import * as React from 'react';
import { Button, Modal, Table, Text } from 'bumbag';
import DeleteModelDialog from '@/Components/DeleteModelDialog';
import Icon from '@/Components/Icon';
import UpdateEmployeeModalForm from './UpdateEmployeeModalForm';

export default function EmployeesTable({ employees, users, roles, departments, teams }) {
  const [selectedEmployee, setSelectedEmployee] = React.useState();

  const deleteModal = Modal.useState();
  const deleteModalDisclosureProps = Modal.Disclosure.useProps({ ...deleteModal });

  const updateModal = Modal.useState();
  const updateModalDisclosureProps = Modal.Disclosure.useProps({ ...updateModal });

  return (
    <>
      <UpdateEmployeeModalForm
        employee={selectedEmployee}
        users={users}
        roles={roles}
        departments={departments}
        teams={teams}
        modalProps={updateModal}
      />
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
            <Table.HeadCell>E-mail</Table.HeadCell>
            <Table.HeadCell>Telefone</Table.HeadCell>
            <Table.HeadCell>Cargo</Table.HeadCell>
            <Table.HeadCell>Time</Table.HeadCell>
            <Table.HeadCell>Departamento</Table.HeadCell>
            <Table.HeadCell>Data de Nascimento</Table.HeadCell>
            <Table.HeadCell>Contratação</Table.HeadCell>
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
              <Table.Cell>{employee.user.email}</Table.Cell>
              <Table.Cell>{employee.phone}</Table.Cell>
              <Table.Cell>{employee.role.name}</Table.Cell>
              <Table.Cell>{employee.team.name}</Table.Cell>
              <Table.Cell>{employee.department.name}</Table.Cell>
              <Table.Cell>
                {new Date(employee.birthDate).toLocaleDateString('pt-br', { timeZone: 'UTC' })}
              </Table.Cell>
              <Table.Cell>
                {new Date(employee.hiringDate).toLocaleDateString('pt-br', { timeZone: 'UTC' })}
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Button
                  variant='ghost'
                  borderRadius='7'
                  {...updateModalDisclosureProps}
                  onClick={() => {
                    setSelectedEmployee(employee);
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
