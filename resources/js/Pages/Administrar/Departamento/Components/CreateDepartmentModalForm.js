import React from 'react';
import { Dialog, Modal, Stack } from 'bumbag';
import Button from '@/Components/StyledButton';
import Input from '@/Components/StyledInput';
import ValidationErrors from '@/Components/ValidationErrors';
import { useForm } from '@inertiajs/inertia-react';
import Icon from '@/Components/Icon';
import { appRoute } from '@/Utils/navigation';

export default function Create() {
  const modal = Modal.useState();
  const {
    data,
    setData,
    post,
    processing,
    errors: formErrors,
    reset,
  } = useForm({
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
    post(appRoute('departments.create'), {
      onSuccess: () => {
        reset('name', 'description');
        modal.hide();
      },
    });
  };

  return (
    <>
      <Modal.Disclosure use={Button} {...modal}>
        <Icon name='groups' spacing={1} />
        Novo Departamento
      </Modal.Disclosure>
      <Dialog.Modal
        showActionButtons
        actionButtonsProps={{
          submitProps: { isLoading: processing },
          submitText: 'Salvar',
          cancelText: 'Cancelar',
          onClickSubmit: submit,
        }}
        title='Registrar Departamento'
        wrap={(children) => <form>{children}</form>}
        {...modal}
      >
        <ValidationErrors errors={formErrors} />
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
