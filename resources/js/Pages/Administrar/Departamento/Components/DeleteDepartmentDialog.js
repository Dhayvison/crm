import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Dialog, Text } from 'bumbag';
import ValidationErrors from '@/Components/ValidationErrors';

export default function DeleteDepartmentDialog({ department, modalProps }) {
  const { processing, errors, delete: destroy } = useForm({});

  const submit = () => {
    destroy(route('departments.delete', { id: department.id }), {
      onSuccess: () => {
        modalProps.hide();
      },
    });
  };

  return (
    <Dialog.Modal
      showActionButtons
      actionButtonsProps={{
        submitProps: { isLoading: processing, palette: 'warning' },
        submitText: 'Sim, desativar',
        cancelText: 'Cancelar',
        onClickSubmit: submit,
      }}
      type='warning'
      title='Desativar departamento'
      {...modalProps}
    >
      Tem certeza que deseja desativar o departamento{' '}
      <Text use='strong'>{department && department.name}</Text>?
      <ValidationErrors errors={errors} />
    </Dialog.Modal>
  );
}
