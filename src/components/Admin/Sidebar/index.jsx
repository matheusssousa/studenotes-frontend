import React, { useState } from "react";
import { useTheme } from "../../../context/Theme/ThemeContext";
import { useAuth } from "../../../context/Authenticate/AuthContext";
import { NavLink } from "react-router-dom";
import { House, ChatsTeardrop, BookBookmark, User, UserCircleGear, ClockCounterClockwise, SquaresFour, DotsThree, TextAlignLeft, MoonStars, SunHorizon } from "@phosphor-icons/react";
// import BigHeads from "../../../hooks/Avatars";
import Logo from "../../../assets/Logo";

import './style.css';

export default function SidebarAdmin(params) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { admin, LogoutAdmin } = useAuth();

    const links = [
        { name: "Página Inicial", link: "/admin/home", icon: House },
        { name: "Dashboard", link: "/admin/dashboard", icon: SquaresFour },
        { name: "Comunidade", link: "/admin/comunidade", icon: ChatsTeardrop },
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

    return (
        <nav className={`sidebar-admin ${sidebarOpen ? 'open' : 'close'}`}>
            <div className="row-cel-pc">
                <button className={`btn-open-sidebar ${sidebarOpen && 'text-azul-200'}`} onClick={() => setSidebarOpen(!sidebarOpen)}><TextAlignLeft size={23} /></button>
                <Logo cor='azul' tamanho='sidebar' />
                <div className="menu" aria-hidden='true'>
                    {links.map((links, i) => (
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
                    ))}
                </div>
                <div className="options">
                    {theme === "light" ?
                        <MoonStars size={23} onClick={() => setTheme("dark")} className="buttonmoon" /> :
                        <SunHorizon size={23} onClick={() => setTheme("light")} className="buttonsun" />
                    }
                    <button className="w-10 h-10 hover:drop-shadow-lg duration-300 bg-azul-200 rounded-full"></button>
                </div>
            </div>
            <div className="menu-cel" aria-hidden='true'>
                {links.map((links, i) => (
                    <NavLink
                        key={i}
                        to={links.link}
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
        </nav>
    )
}