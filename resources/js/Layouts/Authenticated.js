import ApplicationLogo from '../Components/ApplicationLogo';
import Dropdown from '../Components/Dropdown';
import NavLink from '../Components/NavLink';
import React, { useState } from 'react';
import ResponsiveNavLink from '../Components/ResponsiveNavLink';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Box, Button, Container, Divider, DropdownMenu, Image, Switch, Text, TopNav, useColorMode } from 'bumbag';

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
                            <TopNav.Item href="https://bumbag.style" fontWeight="semibold">
                                <InertiaLink href="/">
                                    <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                                </InertiaLink>
                            </TopNav.Item>
                            <TopNav.Item href="#">
                                <NavLink href={route('administrar')} active={route().current('administrar')}>
                                    <Text color='text'>Administrar</Text>
                                </NavLink>
                            </TopNav.Item>
                            <TopNav.Item href="#">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    <Text color='text'>Dashboard</Text>
                                </NavLink>
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
            
            <Container>
                {children}
            </Container>
        </Box>
    );
}
