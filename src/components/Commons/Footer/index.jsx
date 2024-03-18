import React from "react";

export default function Footer(params) {
    const Year = new Date().getFullYear();
    return (
        <footer className="border-t border-neutro-300 border-opacity-20 flex justify-between items-center py-3 px-2 text-neutro-600">
            <p className="text-xs">© {Year} StudeNotes. Todos os direitos reservados.</p>
            <span className="text-xs flex items-center flex-col">
                <p>Desenvolvido por <a href="https://matheussousa.vercel.app/home" className="text-azul-200">Matheus Sousa</a>.</p>
            </span>
        </footer>
    )
}