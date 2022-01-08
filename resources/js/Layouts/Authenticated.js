import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Box, Button, Container, DropdownMenu, Switch, Text, TopNav, useColorMode } from 'bumbag';
import { appRoute } from '@/Utils/navigation';
import NavLink from '../Components/NavLink';
import ApplicationLogo from '../Components/ApplicationLogo';

const ADMINISTRAR_MENU_ITEMS = [
  {
    routeName: 'administrar.usuarios',
    text: 'Usuários',
  },
  {
    routeName: 'administrar.colaboradores',
    text: 'Colaboradores',
  },
  {
    routeName: 'administrar.cargos',
    text: 'Cargos',
  },
  {
    routeName: 'administrar.departamentos',
    text: 'Departamentos',
  },
  {
    routeName: 'administrar.times',
    text: 'Times',
  },
  {
    routeName: 'administrar.clientes',
    text: 'Clientes',
  },
];

export default function Authenticated({ auth, header, children }) {
  const { colorMode, setColorMode } = useColorMode();

  React.useEffect(() => {
    document.title = header;
  }, [header]);

  return (
    <Box width='100vw' height='100vh' overflow='overlay' backgroundColor='default'>
      <Box altitude='100'>
        <Container>
          <TopNav>
            <TopNav.Section>
              <TopNav.Item use={(props) => <InertiaLink href='/' {...props} />}>
                <ApplicationLogo className='block h-20' />
              </TopNav.Item>
              <TopNav.Item>
                <DropdownMenu
                  menu={ADMINISTRAR_MENU_ITEMS.map((menuItem) => (
                    <DropdownMenu.Item padding='0' key={menuItem.routeName}>
                      <InertiaLink
                        href={appRoute(menuItem.routeName)}
                        method='get'
                        className='block w-full px-4 py-2'
                      >
                        {menuItem.text}
                      </InertiaLink>
                    </DropdownMenu.Item>
                  ))}
                >
                  <Button variant='ghost' margin='major-2' iconAfter='chevron-down'>
                    Administrar
                  </Button>
                </DropdownMenu>
              </TopNav.Item>
              <TopNav.Item
                use={(props) => (
                  <NavLink
                    href={appRoute('dashboard')}
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
                        href={appRoute('logout')}
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

      <Container paddingY='major-2'>{children}</Container>
    </Box>
  );
}
