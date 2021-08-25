import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Dialog, FieldStack, Modal } from 'bumbag';
import Button from '@/Components/StyledButton';
import Input from '@/Components/StyledInput';
import Select from '@/Components/StyledSelect';

export default function Create({ users, roles, departments, teams }) {
  const modal = Modal.useState();
  const {
    data,
    setData,
    post,
    processing,
    errors: formErrors,
    reset,
  } = useForm({
    fullName: '',
    birthDate: '',
    hiringDate: '',
    phone: '',
    cellphone: '',
    userId: '',
    departmentId: '',
    teamId: '',
    roleId: '',
  });

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('employees.create'), {
      onSuccess: () => {
        reset(
          'fullName',
          'birthDate',
          'hiringDate',
          'phone',
          'cellphone',
          'userId',
          'departmentId',
          'teamId',
          'roleId'
        );
        modal.hide();
      },
    });
  };

  return (
    <>
      <Modal.Disclosure use={Button} {...modal}>
        Novo Colaborador
      </Modal.Disclosure>
      <Dialog.Modal
        showActionButtons
        actionButtonsProps={{
          submitProps: { isLoading: processing },
          submitText: 'Salvar',
          cancelText: 'Cancelar',
          onClickSubmit: submit,
        }}
        title='Registrar Colaborador'
        use='form'
        {...modal}
      >
        <FieldStack>
          <Input
            type='text'
            name='fullName'
            label='Nome Completo'
            value={data.fullName}
            error={formErrors.fullName && 'Insira o nome completo do colaborador'}
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
              error={formErrors.birthDate && 'Insira a data de nascimento'}
              handleChange={onHandleChange}
              required
            />
            <Input
              type='date'
              name='hiringDate'
              label='Data de Contratação'
              value={data.hiringDate}
              error={formErrors.hiringDate && 'Insira a data de contratação'}
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
              error={formErrors.phone && 'Insira um telefone válido'}
              handleChange={onHandleChange}
              required
            />

            <Input
              type='tel'
              name='cellphone'
              label='Telefone celular'
              value={data.cellphone}
              error={formErrors.cellphone && 'Insira um celular válido'}
              handleChange={onHandleChange}
              required
            />
          </FieldStack>

          <Select
            name='userId'
            label='E-mail'
            options={users.map((user) => ({ label: user.email, value: user.id }))}
            value={data.userId}
            error={formErrors.userId && 'Selecione o e-mail associado ao colaborador'}
            handleChange={onHandleChange}
          />

          <Select
            name='roleId'
            label='Cargo'
            options={roles.map((role) => ({ label: role.name, value: role.id }))}
            value={data.roleId}
            error={formErrors.roleId && 'Selecione o cargo'}
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
              error={formErrors.departmentId && 'Selecione o departamento'}
              handleChange={onHandleChange}
            />

            <Select
              name='teamId'
              label='Time'
              options={teams.map((team) => ({ label: team.name, value: team.id }))}
              value={data.teamId}
              error={formErrors.teamId && 'Selecione o time'}
              handleChange={onHandleChange}
            />
          </FieldStack>
        </FieldStack>
      </Dialog.Modal>
    </>
  );
}
