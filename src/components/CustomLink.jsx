import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CustomLink({to, withBackground, icon, text}) {
    const link = 'h-full w-full flex justify-center items-center px-6';
    const activeLink = link + ' bg-[#25AFA0]';
    const iconStyle = withBackground ? 'mr-2 invert-0 bg-white rounded-[50%] p-2' : 'mr-2 invert';

    return (
        <NavLink
            to={to} 
            className={({ isActive }) => isActive ? activeLink : link}
        >
            <FontAwesomeIcon className={iconStyle} icon={icon} />
            <p className='text-white'>{text}</p>
        </NavLink>
    );
}