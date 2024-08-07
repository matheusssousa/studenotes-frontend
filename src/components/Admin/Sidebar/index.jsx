import React, { useEffect, useState } from "react";
import { useTheme } from "../../../context/Theme/ThemeContext";
import { useAuth } from "../../../context/Authenticate/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { House, ChatsTeardrop, BookBookmark, User, UserCircleGear, ClockCounterClockwise, SquaresFour, DotsThree, TextAlignLeft, MoonStars, SunHorizon, ExclamationMark } from "@phosphor-icons/react";
// import BigHeads from "../../../hooks/Avatars";
import Logo from "../../../assets/Logo";

import './style.css';

export default function SidebarAdmin(params) {
    const { theme, setTheme } = useTheme();
    const { admin, LogoutAdmin } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userOptions, setUserOptions] = useState(false);

    const firstName = admin.name.split(' ')[0];
    const lastName = admin.name.split(' ')[1];
    const letters = `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`;

    const links = [
        { name: "Página Inicial", link: "/admin/home", icon: House },
        { name: "Dashboard", link: "/admin/dashboard", icon: SquaresFour },
        { name: "Comunidade", link: "/admin/comunidade", icon: ChatsTeardrop },
        { name: "Denúncias", link: "/admin/denuncias", icon: ExclamationMark },
        { name: "Disciplinas", link: "/admin/disciplinas", icon: BookBookmark },
        { name: "Usuários", link: "/admin/usuarios", icon: User },
        { name: "Administradores", link: "/admin/admins", icon: UserCircleGear },
        { name: "Logs", link: "/admin/logs", icon: ClockCounterClockwise },
    ];

    const Logout = async (event) => {
        event.preventDefault();
        try {
            await LogoutAdmin();
        } catch (error) { }
    }

    const handleNavLinkClick = () => {
        if (sidebarOpen) {
            setSidebarOpen(false);
        }
    };

    const handleNavLinkUserClick = () => {
        if (userOptions) {
            setUserOptions(!userOptions)
            setSidebarOpen(!sidebarOpen)
        } else {
            setSidebarOpen(!sidebarOpen)
        }
    }

    const handleNavLinkUserOptionClick = () => {
        if (sidebarOpen) {
            setSidebarOpen(false)
            setUserOptions(!userOptions)
        } else {
            setUserOptions(!userOptions)
        }
    }

    return (
        <nav className={`sidebar-admin ${sidebarOpen ? 'open' : 'close'}`}>
            <div className="row-cel-pc">
                <button className={`btn-open-sidebar ${sidebarOpen && 'text-azul-200'}`} onClick={handleNavLinkUserClick}><TextAlignLeft size={23} /></button>
                <Link to='/admin/home'><Logo cor='azul' tamanho='sidebar' /></Link>
                <div className="menu" aria-hidden='true'>
                    {links.map((links, i) => (
                        <>
                            <NavLink
                                key={i}
                                to={links.link}
                                className={({ isActive, isPending }) =>
                                    isPending ? "link-pending group" : isActive ? "link-active group" : "link-pending group"
                                }>
                                <div className="link-icon">{React.createElement(links?.icon, { size: "23" })}<div className="link-bar"></div></div>
                                <span className='link-text'>
                                    {links.name}
                                </span>
                            </NavLink>
                            {(i === 1 || i === 3) && <div className="hidden md:flex w-2/3 h-px bg-neutro-300 bg-opacity-20" />}
                        </>
                    ))}
                </div>
                <div className="options">
                    {theme === "light" ?
                        <MoonStars size={23} onClick={() => setTheme("dark")} className="buttonmoon" /> :
                        <SunHorizon size={23} onClick={() => setTheme("light")} className="buttonsun" />
                    }
                    <button className={`letters-user${userOptions ? '-active' : ''}`} onClick={handleNavLinkUserOptionClick}>{letters}</button>
                </div>
            </div>
            <div className="menu-cel" aria-hidden='true'>
                {links.map((links, i) => (
                    <NavLink
                        key={i}
                        to={links.link}
                        onClick={handleNavLinkClick}
                        className={({ isActive, isPending }) =>
                            isPending ? "link-pending group" : isActive ? "link-active group" : "link-pending group"
                        }>
                        <div className="link-icon">{React.createElement(links?.icon, { size: "23" })}<div className="link-bar"></div></div>
                        <span className='link-text-cel'>
                            {links.name}
                        </span>
                    </NavLink>
                ))}
            </div>
            <div className={`user-menu-options ${!userOptions && 'hidden'}`}>
                <Link to='/admin/conta' className="text-center hover:drop-shadow duration-300">Conta</Link>
                <button type="button" onClick={Logout} className="hover:drop-shadow duration-300">Sair</button>
                <div className="w-full h-px bg-neutro-300 bg-opacity-20 my-2" />
                <small className="text-center">{admin.name}</small>
            </div>
        </nav>
    )
}