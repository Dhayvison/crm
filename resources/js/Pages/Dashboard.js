import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import { Alert } from 'bumbag';

export default function Dashboard(props) {
  const { auth, errors } = props;

  return (
    <Authenticated auth={auth} errors={errors} header='Dashboard'>
      <Alert title='Tudo certo!' type='success'>
        Você está logado.
      </Alert>
    </Authenticated>
  );
}
