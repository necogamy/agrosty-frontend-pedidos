import React from 'react';
import { faBell, faBox, faUser } from '@fortawesome/free-solid-svg-icons';
import { CustomLink } from './CustomLink';

const links = [
    {
        name: 'Pedidos',
        to: 'pedidos',
        withBackground: false,
        icon: faBox
    }, 
    {
        name: 'Notificaciones',
        to: 'notificaciones',
        withBackground: true,
        icon: faBell
    }, 
    {
        name: 'Receptores',
        to: 'receptores',
        withBackground: false,
        icon: faUser
    }
];

export function Header() {
    return (
        <header className='flex basis-[10%] bg-gradient-to-r from-[#025B89] to-[#058A72] items-center justify-end'>
            <nav className='h-full flex gap-4 justify-center items-center'>
                {
                    links.map((link, counter) =>
                        <CustomLink 
                            to={link.to}
                            withBackground={link.withBackground}
                            isActual={link.isActual}
                            icon={link.icon}
                            text={link.name}
                            key={counter + 1}
                        />
                    )
                }
            </nav>
            <div className='mx-6 bg-white rounded-[50%] py-1.5 px-3 font-bold'>A</div>
        </header>
    );
}
