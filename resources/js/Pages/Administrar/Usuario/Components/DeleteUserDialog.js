import * as React from 'react';
import { Box, Button, Dialog, Modal, Text } from 'bumbag';
import { useForm } from '@inertiajs/inertia-react';
import ValidationErrors from '@/Components/ValidationErrors';

export default function DeleteUserDialog({ user, modalProps }) {
  const { processing, errors, delete: destroy } = useForm({});

  const submit = () => {
    destroy(route('user.delete', { id: user.id }), {
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
      title='Desativar usuário'
      {...modalProps}
    >
      Tem certeza que deseja desativar o usuário <Text use='strong'>{user && user.name}</Text>?
      <ValidationErrors errors={errors} />
    </Dialog.Modal>
  );
}
