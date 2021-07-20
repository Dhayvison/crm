import Button from '@/Components/StyledButton';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/StyledInput';
import React, { useEffect } from 'react';
import ValidationErrors from '@/Components/ValidationErrors';
import { useForm } from '@inertiajs/inertia-react';
import { Card, Stack } from 'bumbag';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        document.title = "Login"
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <Guest>
            <Card 
                variant="shadowed" 
                width='400px'
            >
            
            <ValidationErrors errors={errors} />
            <form onSubmit={submit}>

                <Stack spacing="major-4">
                    <Input
                        type="text"
                        name="email"
                        label="E-mail"
                        value={data.email}
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                        
                    <Input
                        type="password"
                        name="password"
                        label="Senha"
                        value={data.password}
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />

                    <Input
                        type="hidden"
                        name="remember"
                        value={true}
                    />

                    <Button 
                        isLoading={processing}
                        width='100%'
                        palette="primary"
                    >
                        Entrar
                    </Button>    
                </Stack>
            </form>
            </Card>
        </Guest>
    );
}
