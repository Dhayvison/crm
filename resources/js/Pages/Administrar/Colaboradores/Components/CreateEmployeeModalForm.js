import React from 'react';
import { useFetch } from 'react-async';
import { Dialog, FieldStack, Modal, useToasts } from 'bumbag';
import { useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/StyledButton';
import Input from '@/Components/StyledInput';
import Select from '@/Components/StyledSelect';
import Icon from '@/Components/Icon';
import { appRoute } from '@/Utils/navigation';

export default function Create() {
  const modal = Modal.useState();

  const fetchGeneralOptions = {
    defer: true,
    json: true,
    initialValue: { data: [] },
  };

  const {
    data: users,
    isPending: pendingUsers,
    run: getUsers,
  } = useFetch(appRoute('api.users'), {}, fetchGeneralOptions);

  const {
    data: roles,
    isPending: pendingRoles,
    run: getRoles,
  } = useFetch(appRoute('api.roles'), {}, fetchGeneralOptions);

  const {
    data: departments,
    isPending: pendingDepartments,
    run: getDepartments,
  } = useFetch(appRoute('api.departments'), {}, fetchGeneralOptions);

  const {
    data: teams,
    isPending: pendingTeams,
    run: getTeams,
  } = useFetch(appRoute('api.teams'), {}, fetchGeneralOptions);

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
  const toast = useToasts();

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();
    post(appRoute('employees.create'), {
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
        toast.success({ title: 'Colaborador registrado com sucesso' });
      },
    });
  };

  React.useEffect(() => {
    getUsers();
    getRoles();
    getDepartments();
    getTeams();
  }, []);

  return (
    <>
      <Modal.Disclosure use={Button} {...modal}>
        <Icon name='person' spacing={1} /> Novo Colaborador
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
        wrap={(children) => <form>{children}</form>}
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
            options={users.data.map((user) => ({ label: user.email, value: user.id }))}
            value={data.userId}
            error={formErrors.userId && 'Selecione o e-mail associado ao colaborador'}
            handleChange={onHandleChange}
            inputProps={{ isLoading: pendingUsers }}
          />

          <Select
            name='roleId'
            label='Cargo'
            options={roles.data.map((role) => ({ label: role.name, value: role.id }))}
            value={data.roleId}
            error={formErrors.roleId && 'Selecione o cargo'}
            handleChange={onHandleChange}
            inputProps={{ isLoading: pendingRoles }}
          />

          <FieldStack orientation='horizontal'>
            <Select
              name='departmentId'
              label='Departamento'
              options={departments.data.map((department) => ({
                label: department.name,
                value: department.id,
              }))}
              value={data.departmentId}
              error={formErrors.departmentId && 'Selecione o departamento'}
              handleChange={onHandleChange}
              inputProps={{ isLoading: pendingDepartments }}
            />

            <Select
              name='teamId'
              label='Time'
              options={teams.data.map((team) => ({ label: team.name, value: team.id }))}
              value={data.teamId}
              error={formErrors.teamId && 'Selecione o time'}
              handleChange={onHandleChange}
              inputProps={{ isLoading: pendingTeams }}
            />
          </FieldStack>
        </FieldStack>
      </Dialog.Modal>
    </>
  );
}
