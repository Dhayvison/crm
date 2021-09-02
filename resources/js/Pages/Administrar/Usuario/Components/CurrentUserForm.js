import * as React from 'react';
import { Avatar, FieldStack, Flex } from 'bumbag';
import { useDebouncedCallback } from 'use-debounce';
import { useForm } from '@inertiajs/inertia-react';

import Input from '@/Components/StyledInput';

function CurrentUserForm({ user }) {
  const { data, setData, put, errors, processing } = useForm({
    name: user.name,
    email: user.email,
  });

  const submit = useDebouncedCallback(() => {
    put(route('user.update', { id: user.id }));
  }, 2000);

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === 'checkbox' ? event.target.checked : event.target.value
    );
    submit();
  };

  return (
    <Flex alignItems='center' marginBottom='major-4'>
      <Avatar
        src='https://thispersondoesnotexist.com/image'
        variant='circle'
        size='large'
        alt={user.name}
      />

      <FieldStack marginLeft='major-4' use='form'>
        <Input
          type='text'
          name='name'
          value={data.name}
          autoComplete='name'
          handleChange={onHandleChange}
          required
          error={errors.name}
          inputProps={{
            variant: 'borderless',
            inputProps: {
              background: 'transparent',
              fontSize: '3rem',
              fontWeight: 'bold',
              height: 'fit-content',
            },
            isLoading: processing,
          }}
        />

        <Input
          type='email'
          name='email'
          value={data.email}
          autoComplete='username'
          handleChange={onHandleChange}
          required
          error={errors.email}
          inputProps={{
            variant: 'borderless',
            inputProps: {
              background: 'transparent',
              fontSize: '2rem',
              height: 'fit-content',
            },
            isLoading: processing,
          }}
        />
      </FieldStack>
    </Flex>
  );
}

export { CurrentUserForm };
