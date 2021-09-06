import * as React from 'react';
import { Dialog, Stack } from 'bumbag';
import { useForm } from '@inertiajs/inertia-react';

import Input from '@/Components/StyledInput';

export default function UpdateDepartmentModalForm({ department, modalProps }) {
  const { data, setData, processing, errors, put } = useForm({
    id: 0,
    name: '',
    description: '',
  });

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();
    put(route('departments.update', { id: data.id }), {
      onSuccess: () => {
        modalProps.hide();
      },
    });
  };

  React.useEffect(() => {
    if (department) {
      setData({ id: department.id, name: department.name, description: department.description });
    }
  }, [department]);

  return (
    <Dialog.Modal
      showActionButtons
      actionButtonsProps={{
        submitProps: { isLoading: processing },
        submitText: 'Salvar',
        cancelText: 'Cancelar',
        onClickSubmit: submit,
      }}
      title='Editar Departamento'
      use='form'
      {...modalProps}
    >
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
          type='textarea'
          name='description'
          label='Descrição'
          value={data.description}
          error={errors.description}
          handleChange={onHandleChange}
          required
        />
      </Stack>
    </Dialog.Modal>
  );
}
