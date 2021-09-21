import * as React from 'react';
import { Dialog, Stack } from 'bumbag';
import { useForm } from '@inertiajs/inertia-react';
import Input from '@/Components/StyledInput';

export default function UpdateRoleModalForm({ role, modalProps }) {
  const { data, setData, processing, errors, put } = useForm({
    id: 0,
    name: '',
    wages: '',
  });

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();
    put(route('roles.update', { id: data.id }), {
      onSuccess: () => {
        modalProps.hide();
      },
    });
  };

  React.useEffect(() => {
    if (role) {
      setData({ id: role.id, name: role.name, wages: role.wages });
    }
  }, [role]);

  return (
    <Dialog.Modal
      showActionButtons
      actionButtonsProps={{
        submitProps: { isLoading: processing },
        submitText: 'Salvar',
        cancelText: 'Cancelar',
        onClickSubmit: submit,
      }}
      title='Editar Cargo'
      wrap={(children) => <form>{children}</form>}
      {...modalProps}
    >
      {role && (
        <Stack spacing='major-4'>
          <Input
            type='text'
            name='name'
            label='Nome'
            value={data.name}
            error={errors.name}
            isFocused
            handleChange={onHandleChange}
            required
          />

          <Input
            type='number'
            name='wages'
            label='Salário'
            value={data.wages}
            error={errors.wages}
            handleChange={onHandleChange}
            required
          />
        </Stack>
      )}
    </Dialog.Modal>
  );
}
