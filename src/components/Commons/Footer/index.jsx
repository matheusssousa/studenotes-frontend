import React from "react";

export default function Footer(params) {
    const Year = new Date().getFullYear();
    return (
        <footer className="border-t border-neutro-300 border-opacity-20 flex justify-between items-center flex-col md:flex-row py-3 px-1 md:px-5 text-neutro-600 dark:text-neutro-100">
            <p className="text-xs">© {Year} StudeNotes. Todos os direitos reservados.</p>
            <span className="text-xs flex items-center flex-col">
                <p>Desenvolvido por <a href="https://matheussousa.vercel.app/home" target="_blank" className="text-azul-200 hover:underline-offset-1 hover:underline">Matheus Sousa</a>.</p>
            </span>
        </footer>
    )
}