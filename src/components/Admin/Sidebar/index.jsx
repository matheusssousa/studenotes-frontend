import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../context/Theme/ThemeContext";
import { useAuth } from "../../../context/Authenticate/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { House, ChatsTeardrop, BookBookmark, User, UserCircleGear, ClockCounterClockwise, SquaresFour, DotsThree, TextAlignLeft, MoonStars, SunHorizon, ExclamationMark } from "@phosphor-icons/react";
// import BigHeads from "../../../hooks/Avatars";
import Logo from "../../../assets/Logo";

import './style.css';

export default function SidebarAdmin(params) {
    const ref = useRef(null);
    const { theme, setTheme } = useTheme();
    const { admin, LogoutAdmin } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userOptions, setUserOptions] = useState(false);

    const firstName = admin.name.split(' ')[0];
    const lastName = admin.name.split(' ')[1];
    const letters = `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`;

    const links = [
        // { name: "Página Inicial", link: "/admin/home", icon: House },
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

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setUserOptions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setUserOptions]);

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
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: userOptions ? 1 : 0, y: userOptions ? 0 : -10 }}
                transition={{ duration: 0.2 }}
                className={`user-menu-options ${!userOptions && 'hidden'}`}
            >
                {theme === "light" ?
                    <button onClick={() => setTheme("dark")} type="button" className="buttonmoon"><MoonStars size={23} /> Modo Escuro</button> :
                    <button onClick={() => setTheme("light")} type="button" className="buttonsun"><SunHorizon size={23} /> Modo Claro</button>
                }
                <div className="w-full h-px bg-neutro-300 bg-opacity-20 my-2" />
                <Link to='admin/conta' className="text-center hover:text-neutro-300 duration-300">Minha conta</Link>
                <button type="button" onClick={Logout} className="hover:text-neutro-300 duration-300">Sair</button>
                <div className="w-full h-px bg-neutro-300 bg-opacity-20 my-2" />
                <small className="text-center">{admin.name}</small>
            </motion.div>
        </nav>
    )
}