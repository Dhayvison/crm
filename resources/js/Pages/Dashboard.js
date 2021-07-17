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
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                    <Alert title="Tudo certo!" type="success">
                        Você está logado.
                    </Alert>
                
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
