import ApplicationLogo from '../Components/ApplicationLogo';
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { useTheme, useColorMode, Box} from 'bumbag';

export default function Guest({ children }) {
    const { theme } = useTheme();
    const { colorMode } = useColorMode();

    React.useEffect(()=>{
        console.log(colorMode);
    })

    return (
        <Box
            width='100vw'
            height='100vh'
            alignX='center'
            alignY='center'
            style={{
                backgroundImage: 'url(https://picsum.photos/1000/300?grayscale)',
                backgroundSize: 'contain',
                boxShadow: `inset 100px -800px 500px 50px ${colorMode === 'dark' ? theme.palette.blueShade : theme.palette.infoTint}`,
            }}
            
        >
            <Box>
                <InertiaLink href="/">
                    <ApplicationLogo className="w-auto fill-current" />
                </InertiaLink>
            </Box>
            
            <Box>
                {children}
            </Box>   
        </Box>
    );
}
