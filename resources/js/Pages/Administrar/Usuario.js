import Authenticated from '@/Layouts/Authenticated';
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Alert, Box, Columns, SideNav } from 'bumbag';

export default function Administrar(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={'Usuários'}
        >
            {/* <Columns marginTop='major-2'>
                <Columns.Column spread={3}>
                    <Box 
                        borderRadius="4" 
                        border="default"
                        paddingY='major-2'
                    >
                        <SideNav>
                            <SideNav.Level>
                                <SideNav.Item use={(props) => {return <InertiaLink href={route('administrar.usuarios')} active={route().current('administrar.usuarios')} {...props}/>}} >
                                    Usuários
                                </SideNav.Item>
                            </SideNav.Level>
                        </SideNav>
                    </Box>
                </Columns.Column>
                <Columns.Column spread={9}>
                    {props.children}
                </Columns.Column>
            </Columns> */}

            <Alert title='funcionou' type='success'>
              Você está na página de gerencia de usuários
            </Alert>
        </Authenticated>
    );
}
