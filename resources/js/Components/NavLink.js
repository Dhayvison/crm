import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react';

export default function NavLink({ href, active, children }) {
    return (
        <InertiaLink
            href={href}
            className={
                active
                    ? 'px-3 ml-2 inline-flex items-center px-1 pt-1 border-b-4 border-l-4 border-r-4 border-indigo-400 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                    : 'px-3 ml-2 inline-flex items-center px-1 pt-1 border-b-4 border-l-4 border-r-4 border-transparent hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
            }

            style={{
                borderRightColor: 'transparent',
                borderLeftColor: 'transparent'
            }}
        >
            {children}
        </InertiaLink>
    );
}
