import React, { useState, useEffect } from "react";

export default function Logo({ cor, tamanho }) {
    const [color, setColor] = useState(null);
    const [font, setFont] = useState(null);
    const [font2, setFont2] = useState(null)

    useEffect(() => {
        switch (cor) {
            case 'branco':
                setColor('text-neutro-100');
                break;
            case 'azul':
                setColor('text-azul-200');
                break;
            case 'azul-escuro':
                setColor('text-azul-300');
                break;
            case 'preto':
                setColor('text-neutro-600');
                break;
            default:
                break;
        }
        switch (tamanho) {
            case 'sidebar':
                setFont('md:text-sm text-xl translate-y-2 md:translate-y-0');
                setFont2('md:text-xs md:-translate-y-2 text-lg -translate-y-1');
                break;
            case 'pequeno':
                setFont('text-xl');
                setFont2('text-lg -translate-y-3');
                break;
            case 'medio':
                setFont('text-4xl');
                setFont2('text-3xl -translate-y-3');
                break;
            case 'grande':
                setFont('text-6xl md:text-9xl');
                setFont2('text-5xl md:text-8xl -translate-y-4 md:-translate-y-8');
                break;
            default:
                break;
        }
    }, [cor, tamanho]);

    return (
        <span className={`w-full flex flex-col text items-center ${color}`}>
            <h1 className={`font-aquire drop-shadow-lg ${font}`}>Stude</h1>
            <h1 className={`font-cheorcy drop-shadow-lg ${font2}`}>Notes</h1>
        </span>
    )
}
