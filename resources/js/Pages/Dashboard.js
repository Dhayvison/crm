import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import { Alert } from 'bumbag'
 
export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={'Dashboard'}
        >
            <Alert title="Tudo certo!" type="success">
                Você está logado.
            </Alert>
        </Authenticated>
    );
}
