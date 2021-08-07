import * as React from 'react';
import { Table, Text } from 'bumbag';
import UpdateDepartmentModalForm from './UpdateDepartmentModalForm';
import DeleteDepartmentDialog from './DeleteDepartmentDialog';

export default function DepartmentsTable({ departments }) {
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
              <UpdateDepartmentModalForm department={department} />
              <DeleteDepartmentDialog department={department} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
