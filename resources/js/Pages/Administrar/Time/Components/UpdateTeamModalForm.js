import * as React from 'react';
import { Dialog, Modal, Button, Stack } from 'bumbag';
import { useForm } from '@inertiajs/inertia-react';
import ValidationErrors from '@/Components/ValidationErrors';
import Input from '@/Components/StyledInput';

export default function UpdateTeamModalForm({ team }) {
  const modal = Modal.useState();
  const { data, setData, processing, errors, put } = useForm({
    name: team.name,
    description: team.description,
  });

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();
    put(route('teams.update', { id: team.id }), {
      onSuccess: () => {
        modal.hide();
      },
    });
  };

  return (
    <>
      <Modal.Disclosure
        use={React.forwardRef((props, ref) => (
          <Button innerRef={ref} variant='ghost' borderRadius='7' {...props} />
        ))}
        {...modal}
      >
        🖊
      </Modal.Disclosure>
      <Dialog.Modal
        showActionButtons
        actionButtonsProps={{
          submitProps: { isLoading: processing },
          submitText: 'Salvar',
          cancelText: 'Cancelar',
          onClickSubmit: submit,
        }}
        title='Editar Time'
        use='form'
        {...modal}
      >
        <ValidationErrors errors={errors} />
        <Stack spacing='major-4'>
          <Input
            type='text'
            name='name'
            label='Nome'
            value={data.name}
            isFocused
            handleChange={onHandleChange}
            required
          />

          <Input
            type='textarea'
            name='description'
            label='Descrição'
            value={data.description}
            handleChange={onHandleChange}
            required
          />
        </Stack>
      </Dialog.Modal>
    </>
  );
}
