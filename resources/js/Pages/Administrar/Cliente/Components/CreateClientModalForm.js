import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { useDebouncedCallback } from 'use-debounce';
import { Dialog, Divider, FieldStack, Modal, Switch, useToasts } from 'bumbag';
import Button from '@/Components/StyledButton';
import Input from '@/Components/StyledInput';
import Icon from '@/Components/Icon';
import { cellphoneMask, cepMask, cnpjMask, cpfMask, phoneMask } from '@/Utils/field-masks';
import moment from 'moment';

export default function CreateClientModalForm() {
  const modal = Modal.useState();
  const {
    data,
    setData,
    post,
    processing,
    errors: formErrors,
    reset,
    clearErrors,
    transform,
  } = useForm({
    name: '',
    birthDate: moment().subtract(18, 'years').format('YYYY-MM-DD'),
    email: '',
    phone: '',
    cellphone: '',
    isCPF: true,
    cpf: '',
    cnpj: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
  });
  const toast = useToasts();

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();
    clearErrors();
    post(route('clients.create'), {
      onSuccess: () => {
        reset();
        modal.hide();
        toast.success({ title: 'Cliente registrado com sucesso' });
      },
    });
  };

  transform((dataForm) => ({
    ...dataForm,
    cpf: dataForm.isCPF ? dataForm.cpf : '',
    cnpj: !dataForm.isCPF ? dataForm.cnpj : '',
  }));

  const searchCEP = useDebouncedCallback((cep) => {
    if (cep) {
      fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.errors) {
            toast.danger({ title: 'CEP não encontrado', message: responseData.message });
          } else {
            setData({
              ...data,
              street: responseData.street,
              neighborhood: responseData.neighborhood,
              city: responseData.city,
              state: responseData.state,
            });
          }
        })
        .catch(() => {
          toast.danger({ title: 'Ops! 🙁', message: 'Ocorreu um erro' });
          setData({
            ...data,
            street: '',
            neighborhood: '',
            city: '',
            state: '',
          });
        });
    }
  }, 1000);

  return (
    <>
      <Modal.Disclosure
        use={React.forwardRef((props, ref) => (
          <Button innerRef={ref} {...props} />
        ))}
        {...modal}
      >
        <Icon name='person' spacing={1} /> Novo Cliente
      </Modal.Disclosure>
      <Dialog.Modal
        showActionButtons
        actionButtonsProps={{
          submitProps: { isLoading: processing },
          submitText: 'Salvar',
          cancelText: 'Cancelar',
          onClickSubmit: submit,
        }}
        title='Cadastrar Cliente'
        wrap={(children) => <form>{children}</form>}
        {...modal}
      >
        <FieldStack>
          <Input
            type='text'
            name='name'
            label='Nome'
            value={data.name}
            error={formErrors.name && 'Insira o nome do cliente'}
            isFocused
            handleChange={onHandleChange}
            required
          />

          <Input
            type='text'
            name='email'
            label='E-mail'
            value={data.email}
            error={formErrors.email && 'Insira um e-mail válido'}
            isFocused
            handleChange={onHandleChange}
            required
          />

          <Input
            type='date'
            name='birthDate'
            label='Data de Nascimento'
            value={data.birthDate}
            error={formErrors.birthDate && 'Insira a data de nascimento'}
            handleChange={onHandleChange}
            required
          />

          <FieldStack orientation='horizontal'>
            <Input
              type='tel'
              name='phone'
              label='Telefone'
              value={data.phone}
              error={formErrors.phone && 'Insira um telefone válido'}
              handleChange={onHandleChange}
              mask={phoneMask}
              required
            />

            <Input
              type='tel'
              name='cellphone'
              label='Telefone celular'
              value={data.cellphone}
              error={formErrors.cellphone && 'Insira um celular válido'}
              handleChange={onHandleChange}
              mask={cellphoneMask}
              required
            />
          </FieldStack>

          <Divider />

          <Switch
            name='isCPF'
            state='primary'
            defaultChecked={data.isCPF}
            label={data.isCPF ? 'Pessoa Física' : 'Pessoa Jurídica'}
            onChange={onHandleChange}
          />
          {data.isCPF ? (
            <Input
              type='text'
              name='cpf'
              label='CPF'
              value={data.cpf}
              error={formErrors.cpf && 'Insira um CPF válido'}
              handleChange={onHandleChange}
              mask={cpfMask}
              required
            />
          ) : (
            <Input
              type='text'
              name='cnpj'
              label='CNPJ'
              value={data.cnpj}
              error={formErrors.cnpj && 'Insira um CNPJ válido'}
              handleChange={onHandleChange}
              mask={cnpjMask}
              required
            />
          )}

          <Divider />

          <Input
            type='text'
            name='cep'
            label='CEP'
            value={data.cep}
            error={formErrors.cep && 'Insira um CEP válido'}
            handleChange={(e) => {
              searchCEP(e.target.value);
              onHandleChange(e);
            }}
            mask={cepMask}
            required
          />

          <FieldStack orientation='horizontal'>
            <Input
              type='text'
              name='street'
              label='Logradouro'
              value={data.street}
              error={formErrors.street && 'Insira o logradouro'}
              handleChange={onHandleChange}
              required
            />
            <Input
              type='number'
              name='number'
              label='Número'
              value={data.number}
              error={formErrors.number && 'Insira o número'}
              handleChange={onHandleChange}
              required
            />
            <Input
              type='text'
              name='neighborhood'
              label='Bairro'
              value={data.neighborhood}
              error={formErrors.neighborhood && 'Insira o bairro'}
              handleChange={onHandleChange}
              required
            />
          </FieldStack>

          <FieldStack orientation='horizontal'>
            <Input
              type='text'
              name='city'
              label='Cidade'
              value={data.city}
              error={formErrors.city && 'Insira a cidade'}
              handleChange={onHandleChange}
              required
            />
            <Input
              type='text'
              name='state'
              label='Estado'
              value={data.state}
              error={formErrors.state && 'Insira o estado'}
              handleChange={onHandleChange}
              required
            />
          </FieldStack>
        </FieldStack>
      </Dialog.Modal>
    </>
  );
}
