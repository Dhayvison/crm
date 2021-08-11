import * as React from 'react';
import { Dialog, Modal, Button, Stack, FieldStack } from 'bumbag';
import { useForm } from '@inertiajs/inertia-react';
import ValidationErrors from '@/Components/ValidationErrors';
import Input from '@/Components/StyledInput';
import Select from '@/Components/StyledSelect';

export default function UpdateEmployeeModalForm({ employee, users, roles, departments, teams }) {
  const modal = Modal.useState();
  const { data, setData, processing, errors, put } = useForm({
    fullName: employee.fullName,
    birthDate: employee.birthDate,
    hiringDate: employee.hiringDate,
    phone: employee.phone,
    cellphone: employee.cellphone,
    userId: employee.user.id,
    departmentId: employee.department.id,
    teamId: employee.team.id,
    roleId: employee.role.id,
  });

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();
    put(route('employees.update', { id: employee.id }), {
      onSuccess: () => {
        modal.hide();
      },
    });
  };

  return (
    <>
      <Modal.Disclosure
        use={React.forwardRef((props, ref) => (
          <Button innerRef={ref} variant='ghost' borderRadius='7' {...props} />
        ))}
        {...modal}
      >
        🖊
      </Modal.Disclosure>
      <Dialog.Modal
        showActionButtons
        actionButtonsProps={{
          submitProps: { isLoading: processing },
          submitText: 'Salvar',
          cancelText: 'Cancelar',
          onClickSubmit: submit,
        }}
        title='Editar Colaborador'
        use='form'
        {...modal}
      >
        <ValidationErrors errors={errors} />
        <FieldStack>
          <Input
            type='text'
            name='fullName'
            label='Nome Completo'
            value={data.fullName}
            isFocused
            handleChange={onHandleChange}
            required
          />

          <FieldStack orientation='horizontal'>
            <Input
              type='date'
              name='birthDate'
              label='Data de Nascimento'
              value={data.birthDate}
              handleChange={onHandleChange}
              required
            />
            <Input
              type='date'
              name='hiringDate'
              label='Data de Contratação'
              value={data.hiringDate}
              handleChange={onHandleChange}
              required
            />
          </FieldStack>
          <FieldStack orientation='horizontal'>
            <Input
              type='tel'
              name='phone'
              label='Telefone'
              value={data.phone}
              handleChange={onHandleChange}
              required
            />

            <Input
              type='tel'
              name='cellphone'
              label='Telefone celular'
              value={data.cellphone}
              handleChange={onHandleChange}
              required
            />
          </FieldStack>

          <Select
            name='userId'
            label='E-mail'
            options={users.map((user) => ({ label: user.email, value: user.id }))}
            value={data.userId}
            handleChange={onHandleChange}
          />

          <Select
            name='roleId'
            label='Cargo'
            options={roles.map((role) => ({ label: role.name, value: role.id }))}
            value={data.roleId}
            handleChange={onHandleChange}
          />

          <FieldStack orientation='horizontal'>
            <Select
              name='departmentId'
              label='Departamento'
              options={departments.map((department) => ({
                label: department.name,
                value: department.id,
              }))}
              value={data.departmentId}
              handleChange={onHandleChange}
            />

            <Select
              name='teamId'
              label='Time'
              options={teams.map((team) => ({ label: team.name, value: team.id }))}
              value={data.teamId}
              handleChange={onHandleChange}
            />
          </FieldStack>
        </FieldStack>
      </Dialog.Modal>
    </>
  );
}