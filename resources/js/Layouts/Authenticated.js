import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Box, Button, Container, DropdownMenu, Switch, Text, TopNav, useColorMode } from 'bumbag';
import NavLink from '../Components/NavLink';
import ApplicationLogo from '../Components/ApplicationLogo';

export default function Authenticated({ auth, header, children }) {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Box width='100vw' height='100vh' overflow='overlay' backgroundColor='default'>
      <Box altitude='100'>
        <Container>
          <TopNav>
            <TopNav.Section>
              <TopNav.Item use={(props) => <InertiaLink href='/' {...props} />}>
                <ApplicationLogo className='block h-9 w-auto' />
              </TopNav.Item>
              <TopNav.Item>
                <DropdownMenu
                  menu={
                    <>
                      <DropdownMenu.Item padding='0'>
                        <InertiaLink
                          href={route('administrar.usuarios')}
                          method='get'
                          className='block w-full px-4 py-2'
                        >
                          Usuários
                        </InertiaLink>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item padding='0'>
                        <InertiaLink
                          href={route('administrar.colaboradores')}
                          method='get'
                          className='block w-full px-4 py-2'
                        >
                          Colaboradores
                        </InertiaLink>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item padding='0'>
                        <InertiaLink
                          href={route('administrar.cargos')}
                          method='get'
                          className='block w-full px-4 py-2'
                        >
                          Cargos
                        </InertiaLink>
                      </DropdownMenu.Item>
                    </>
                  }
                >
                  <Button variant='ghost' margin='major-2' iconAfter='chevron-down'>
                    Administrar
                  </Button>
                </DropdownMenu>
              </TopNav.Item>
              <TopNav.Item
                use={(props) => (
                  <NavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                    {...props}
                  />
                )}
              >
                Dashboard
              </TopNav.Item>
            </TopNav.Section>
            <TopNav.Section>
              <DropdownMenu
                menu={
                  <>
                    <DropdownMenu.Item padding='0'>
                      <InertiaLink
                        href={route('logout')}
                        method='post'
                        className='block w-full px-4 py-2'
                      >
                        <Text color='danger'>Sair</Text>
                      </InertiaLink>
                    </DropdownMenu.Item>
                  </>
                }
              >
                <Button variant='ghost' margin='major-2' iconAfter='chevron-down'>
                  {auth.user.name}
                </Button>
              </DropdownMenu>
              <Switch
                state='primary'
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
        <Box backgroundColor='primary' altitude='100' paddingX='minor-1' paddingY='minor-2'>
          <Container>
            <Text color='white' use='strong'>
              {header}
            </Text>
          </Container>
        </Box>
      )}

      <Container paddingTop='major-2'>{children}</Container>
    </Box>
  );
}
