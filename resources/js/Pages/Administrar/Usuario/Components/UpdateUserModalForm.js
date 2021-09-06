import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Dialog, Stack } from 'bumbag';
import Input from '@/Components/StyledInput';

export default function UpdateUserModal({ user, modalProps }) {
  const { data, setData, processing, errors, put } = useForm({
    id: 0,
    name: '',
    email: '',
  });

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();
    put(route('user.update', { id: data.id }), {
      onSuccess: () => {
        modalProps.hide();
      },
    });
  };

  React.useEffect(() => {
    if (user) {
      setData({ id: user.id, name: user.name, email: user.email });
    }
  }, [user]);

  return (
    <Dialog.Modal
      showActionButtons
      actionButtonsProps={{
        submitProps: { isLoading: processing },
        submitText: 'Salvar',
        cancelText: 'Cancelar',
        onClickSubmit: submit,
      }}
      title='Editar usuário'
      use='form'
      {...modalProps}
    >
      {user && (
        <Stack spacing='major-4'>
          <Input
            type='text'
            name='name'
            label='Nome'
            value={data.name}
            error={errors.name && 'Nome não pode ser vazio'}
            autoComplete='name'
            handleChange={onHandleChange}
            required
          />

          <Input
            type='email'
            name='email'
            label='E-mail'
            value={data.email}
            error={errors.email}
            autoComplete='email'
            handleChange={onHandleChange}
            required
          />
        </Stack>
      )}
    </Dialog.Modal>
  );
}
