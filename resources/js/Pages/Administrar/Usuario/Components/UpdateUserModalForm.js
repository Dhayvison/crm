import * as React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Button, Dialog, Modal, Stack } from 'bumbag';
import ValidationErrors from '@/Components/ValidationErrors';
import Input from '@/Components/StyledInput';

export default function UpdateUserModal({ user }) {
  const modal = Modal.useState();
  const { data, setData, processing, errors, put } = useForm({
    name: user.name,
    email: user.email,
  });

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();
    put(route('user.update', { id: user.id }), {
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
        title='Editar usuário'
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
            autoComplete='name'
            isFocused
            handleChange={onHandleChange}
            required
          />

          <Input
            type='email'
            name='email'
            label='E-mail'
            value={data.email}
            autoComplete='username'
            handleChange={onHandleChange}
            required
          />
        </Stack>
      </Dialog.Modal>
    </>
  );
}
