import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import { Alert } from 'bumbag';

export default function Dashboard(props) {
  const { auth, errors } = props;

  React.useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  return (
    <Authenticated auth={auth} errors={errors} header="Dashboard">
      <Alert title="Tudo certo!" type="success">
        Você está logado. Na página de Dashboard.
      </Alert>
    </Authenticated>
  );
}
