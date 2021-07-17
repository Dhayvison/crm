import ApplicationLogo from '../Components/ApplicationLogo';
import NavLink from '../Components/NavLink';
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Box, Button, Container, DropdownMenu, Switch, Text, TopNav, useColorMode } from 'bumbag';

export default function Authenticated({ auth, header, children }) {
    const { colorMode, setColorMode } = useColorMode();

    return (
        <Box
            width='100vw'
            height='100vh'
            backgroundColor='default'
        >
            <Box altitude='100'>
                <Container>
                    <TopNav>
                        <TopNav.Section>
                            <TopNav.Item use={(props) => {return <InertiaLink href="/" {...props}/>}}>
                                <ApplicationLogo className="block h-9 w-auto" />
                            </TopNav.Item>
                            <TopNav.Item use={(props) => {return <NavLink href={route('administrar')} active={route().current('administrar')} {...props}/>}}>
                                Administrar
                            </TopNav.Item>
                            <TopNav.Item use={(props) => {return <NavLink href={route('dashboard')} active={route().current('dashboard')} {...props}/>}}>
                                Dashboard
                            </TopNav.Item>
                        </TopNav.Section>
                        <TopNav.Section>
                            <DropdownMenu
                                menu={
                                    <React.Fragment>
                                        <DropdownMenu.Item padding='0'>
                                            <InertiaLink href={route('logout')} method="post" className='block w-full px-4 py-2'>
                                                <Text color='danger'>Sair</Text>
                                            </InertiaLink>
                                        </DropdownMenu.Item>
                                    </React.Fragment>
                                }
                            >
                                <Button variant="ghost" margin='major-2' iconAfter="chevron-down">{auth.user.name}</Button>
                            </DropdownMenu>
                            <Switch
                                state="primary"
                                defaultChecked={colorMode === 'dark'}
                                label={colorMode === 'default' ? '☀️' : '🌙'}
                                onChange={(event) => {
                                    const isChecked = event.target.checked;
                                    if (isChecked) {
                                        setColorMode('dark');
                                    } else {
                                        setColorMode('default');
                                    }
                                }}
                            />
                        </TopNav.Section>
                    </TopNav>
                </Container>
            </Box>

            {header && (
                <Box 
                    backgroundColor='primary'
                    altitude='100'
                    paddingX='minor-1'
                    paddingY='minor-2'
                >
                    <Container>
                       <Text color='white' use='strong'>{header}</Text> 
                    </Container>
                </Box>
            )}
            
            <Container>
                {children}
            </Container>
        </Box>
    );
}
