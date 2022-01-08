import Button from '@/Components/StyledButton';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/StyledInput';
import Label from '@/Components/Label';
import React, { useEffect } from 'react';
import ValidationErrors from '@/Components/ValidationErrors';
import { useForm } from '@inertiajs/inertia-react';
import { appRoute } from '@/Utils/navigation';

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  useEffect(
    () => () => {
      reset('password');
    },
    []
  );

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(appRoute('password.confirm'));
  };

  return (
    <Guest>
      <div className='mb-4 text-sm text-gray-600'>
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <ValidationErrors errors={errors} />

      <form onSubmit={submit}>
        <div className='mt-4'>
          <Label forInput='password' value='Password' />

          <Input
            type='password'
            name='password'
            value={data.password}
            className='mt-1 block w-full'
            isFocused
            handleChange={onHandleChange}
          />
        </div>

        <div className='flex items-center justify-end mt-4'>
          <Button className='ml-4' processing={processing}>
            Confirm
          </Button>
        </div>
      </form>
    </Guest>
  );
}
