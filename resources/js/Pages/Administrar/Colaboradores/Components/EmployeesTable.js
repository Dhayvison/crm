import * as React from 'react';
import { Table, Text } from 'bumbag';
// import DeleteModelDialog from '@/Components/DeleteModelDialog';
// import UpdateRoleModalForm from './UpdateRoleModalForm';

export default function EmployeesTable({ employees }) {
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
              {/* <UpdateRoleModalForm role={role} />
              <DeleteModelDialog
                deleteRoute={route('roles.delete', { id: role.id })}
                modelName={role.name}
                title='Deletar Cargo'
              /> */}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
