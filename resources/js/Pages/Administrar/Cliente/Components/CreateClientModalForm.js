import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { useDebouncedCallback } from 'use-debounce';
import { Dialog, Divider, FieldStack, Modal, Switch, useToasts } from 'bumbag';
import Button from '@/Components/StyledButton';
import Input from '@/Components/StyledInput';
import Icon from '@/Components/Icon';
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
        reset('name', 'birthDate', 'email', 'phone', 'cellphone', 'address', 'cpf', 'cnpj');
        modal.hide();
        toast.success({ title: 'Cliente registrado com sucesso' });
      },
    });
  };

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

  function cpfMask(cpf) {
    if (cpf.length > 14) {
      return cpf.slice(0, -1);
    }

    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function cnpjMask(cnpj) {
    if (cnpj.length > 18) {
      return cnpj.slice(0, -1);
    }

    return cnpj
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  function phoneMask(phone) {
    if (phone.length > 15) {
      return phone.slice(0, 15);
    }

    return phone
      .replace(/\D/g, '')
      .replace(/^(\d)/, '($1')
      .replace(/(\d{2})(\d)/, '$1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }

  function cepMask(cep) {
    if (cep.length > 9) {
      return cep.slice(0, 9);
    }

    return cep.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
  }

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
              handleChange={(e) => {
                e.target.value = phoneMask(e.target.value);
                onHandleChange(e);
              }}
              required
            />

            <Input
              type='tel'
              name='cellphone'
              label='Telefone celular'
              value={data.cellphone}
              error={formErrors.cellphone && 'Insira um celular válido'}
              handleChange={(e) => {
                e.target.value = phoneMask(e.target.value);
                onHandleChange(e);
              }}
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
              handleChange={(e) => {
                e.target.value = cpfMask(e.target.value);
                onHandleChange(e);
              }}
              required
            />
          ) : (
            <Input
              type='text'
              name='cnpj'
              label='CNPJ'
              value={data.cnpj}
              error={formErrors.cnpj && 'Insira um CNPJ válido'}
              handleChange={(e) => {
                e.target.value = cnpjMask(e.target.value);
                onHandleChange(e);
              }}
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
              e.target.value = cepMask(e.target.value);
              searchCEP(e.target.value);
              onHandleChange(e);
            }}
            required
          />

          <FieldStack orientation='horizontal'>
            <Input
              type='text'
              name='street'
              label='Rua'
              value={data.street}
              error={formErrors.street}
              handleChange={onHandleChange}
              required
            />
            <Input
              type='number'
              name='number'
              label='Número'
              value={data.number}
              error={formErrors.number}
              handleChange={onHandleChange}
              required
            />
            <Input
              type='text'
              name='neighborhood'
              label='Bairro'
              value={data.neighborhood}
              error={formErrors.neighborhood}
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
              error={formErrors.city}
              handleChange={onHandleChange}
              required
            />
            <Input
              type='text'
              name='state'
              label='Estado'
              value={data.state}
              error={formErrors.state}
              handleChange={onHandleChange}
              required
            />
          </FieldStack>
        </FieldStack>
      </Dialog.Modal>
    </>
  );
}
