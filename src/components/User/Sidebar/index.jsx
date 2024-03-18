import React, { useState } from "react";
import { useTheme } from "../../../context/Theme/ThemeContext";
import { useAuth } from "../../../context/Authenticate/AuthContext";
import { BookmarksSimple, ChatsTeardrop, House, Note } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/Logo";

export default function SidebarUser(params) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { user, LogoutUser } = useAuth();

    const links = [
        { name: "Página Inicial", link: "/home", icon: House },
        { name: "Anotacoes", link: "/notes", icon: Note },
        { name: "Categorias", link: "/categorys", icon: BookmarksSimple },
        { name: "Comunidade", link: "/comunidade", icon: ChatsTeardrop },
    ];

    const Logout = async (event) => {
        event.preventDefault();
        try {
            await LogoutUser();
        } catch (error) { }
    }
    return (
        <nav className={`sidebar-admin ${sidebarOpen ? 'open' : 'close'}`}>
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

            </div>
        </nav>
    )
}