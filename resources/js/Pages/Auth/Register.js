import Button from '@/Components/StyledButton';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/StyledInput';
import React, { useEffect } from 'react';
import ValidationErrors from '@/Components/ValidationErrors';
import { useForm } from '@inertiajs/inertia-react';

import { Card, Stack, useToasts } from 'bumbag';
import { appRoute } from '@/Utils/navigation';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const toast = useToasts();

  useEffect(() => {
    document.title = 'Registrar Usuário';
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();

    post(appRoute('register'), {
      onSuccess: () => {
        toast.success({ title: 'Usuário registrado com sucesso' });
      },
    });
  };

  return (
    <Guest>
      <Card variant='shadowed' width='400px'>
        <ValidationErrors errors={errors} />
        <form onSubmit={submit}>
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

            <Input
              type='password'
              name='password'
              label='Senha'
              value={data.password}
              autoComplete='new-password'
              handleChange={onHandleChange}
              required
            />

            <Input
              type='password'
              name='password_confirmation'
              label='Confirmar senha'
              value={data.password_confirmation}
              handleChange={onHandleChange}
              required
            />

            <Button processing={processing} width='100%' palette='primary'>
              Cadastrar
            </Button>
          </Stack>
        </form>
      </Card>
    </Guest>
  );
}
