import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import {Button} from 'bumbag';

export default function Administrar(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={'Administrar'}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">Página da administração</div>
                    </div>
                </div>

            </div>
        </Authenticated>
    );
}
