import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Button, Dialog, Modal, Text } from 'bumbag';
import ValidationErrors from '@/Components/ValidationErrors';

export default function DeleteTeamDialog({ team }) {
  const modal = Modal.useState();
  const { processing, errors, delete: destroy } = useForm({});

  const submit = () => {
    destroy(route('teams.delete', { id: team.id }), {
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
          submitProps: { isLoading: processing, palette: 'danger' },
          submitText: 'Sim, deletar',
          cancelText: 'Cancelar',
          onClickSubmit: submit,
        }}
        type='danger'
        title='Deletar'
        {...modal}
      >
        Tem certeza que deseja deletar o time <Text use='strong'>{team.name}</Text>?
        <ValidationErrors errors={errors} />
      </Dialog.Modal>
    </>
  );
}
