import * as React from 'react';
import { Button, Dialog, Modal, Text } from 'bumbag';
import { useForm } from '@inertiajs/inertia-react';
import ValidationErrors from '@/Components/ValidationErrors';

export default function DeleteUserDialog({ user }) {
  const modal = Modal.useState();
  const { processing, errors, delete: destroy } = useForm({});

  const submit = () => {
    destroy(route('user.delete', { id: user.id }), {
      onSuccess: () => {
        modal.hide();
      },
    });
  };

  return (
    <>
      <Modal.Disclosure
        use={React.forwardRef((props, ref) => (
          <Button innerRef={ref} variant='ghost' palette='danger' borderRadius='7' {...props} />
        ))}
        {...modal}
      >
        🗑
      </Modal.Disclosure>
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
        {...modal}
      >
        Tem certeza que deseja desativar o usuário <Text use='strong'>{user.name}</Text>?
        <ValidationErrors errors={errors} />
      </Dialog.Modal>
    </>
  );
}
