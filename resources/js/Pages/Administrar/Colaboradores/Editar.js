import * as React from 'react';
import { ActionButtons, Button, FieldStack } from 'bumbag';
import { useForm } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import Input from '@/Components/StyledInput';
import Select from '@/Components/StyledSelect';
import Icon from '@/Components/Icon';

export default function Index(props) {
  const { auth, errors } = props;
  const { employee, formData } = props;
  const { users, roles, departments, teams } = formData;
  const {
    data,
    setData,
    processing,
    errors: formErrors,
    put,
  } = useForm({
    id: employee.data.id,
    fullName: employee.data.fullName,
    birthDate: employee.data.birthDate.substring(0, 10),
    hiringDate: employee.data.hiringDate.substring(0, 10),
    phone: employee.data.phone,
    cellphone: employee.data.cellphone,
    userId: employee.data.user.id,
    departmentId: employee.data.department.id,
    teamId: employee.data.team.id,
    roleId: employee.data.role.id,
  });

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();
    put(route('employees.update', { id: data.id }));
  };

  React.useEffect(() => {
    document.title = 'Editar Colaborador';
  }, []);

  return (
    <Authenticated auth={auth} errors={errors} header={`Editar: ${employee.data.fullName}`}>
      <FieldStack marginTop='major-4' use='form'>
        <Input
          type='text'
          name='fullName'
          label='Nome Completo'
          value={data.fullName}
          error={formErrors.fullName}
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
            error={formErrors.birthDate}
            handleChange={onHandleChange}
            required
          />
          <Input
            type='date'
            name='hiringDate'
            label='Data de Contratação'
            value={data.hiringDate}
            error={formErrors.hiringDate}
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
            error={formErrors.phone}
            handleChange={onHandleChange}
            required
          />

          <Input
            type='tel'
            name='cellphone'
            label='Telefone celular'
            value={data.cellphone}
            error={formErrors.cellphone}
            handleChange={onHandleChange}
            required
          />
        </FieldStack>

        <Select
          name='userId'
          label='E-mail'
          options={users.map((user) => ({ label: user.email, value: user.id }))}
          value={data.userId}
          error={formErrors.userId}
          handleChange={onHandleChange}
        />

        <Select
          name='roleId'
          label='Cargo'
          options={roles.map((role) => ({ label: role.name, value: role.id }))}
          value={data.roleId}
          error={formErrors.roleId}
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
            error={formErrors.departmentId}
            handleChange={onHandleChange}
          />

          <Select
            name='teamId'
            label='Time'
            options={teams.map((team) => ({ label: team.name, value: team.id }))}
            value={data.teamId}
            error={formErrors.teamId}
            handleChange={onHandleChange}
          />
        </FieldStack>

        <ActionButtons
          palette='primary'
          onClickSubmit={submit}
          onClickCancel={() => window.history.back()}
          submitProps={{ isLoading: processing }}
          submitText='Salvar'
          cancelText='Cancelar'
        />
      </FieldStack>
    </Authenticated>
  );
}
