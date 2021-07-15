import React from 'react';
import Logo from '../../assets/images/sn-logo.png'

export default function ApplicationLogo({ className }) {
    return (
        <img src={Logo} alt="" className={className}/>
    );
}
