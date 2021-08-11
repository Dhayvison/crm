import * as React from 'react';
import { Table, Text } from 'bumbag';
import DeleteModelDialog from '@/Components/DeleteModelDialog';
import UpdateEmployeeModalForm from './UpdateEmployeeModalForm';

export default function EmployeesTable({ employees, users, roles, departments, teams }) {
  return (
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
            <Table.Cell>{new Date(employee.birthDate).toLocaleString()}</Table.Cell>
            <Table.Cell>{new Date(employee.hiringDate).toLocaleString()}</Table.Cell>
            <Table.Cell textAlign='center'>
              <UpdateEmployeeModalForm
                employee={employee}
                users={users}
                roles={roles}
                departments={departments}
                teams={teams}
              />
              <DeleteModelDialog
                deleteRoute={route('employees.delete', { id: employee.id })}
                modelName={employee.fullName}
                title='Deletar Colaborador'
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
