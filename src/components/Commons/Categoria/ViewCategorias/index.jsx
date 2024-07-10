import React from "react";
import adjustColor from "../../../../hooks/AdjustColor";

const darkenColor = (hex, percent) => adjustColor(hex, percent);

export default function ViewCategorias({ categorias }) {
    return (
        <span className="flex gap-1 mt-2">
            {categorias.map((categoria, i) => (
                <span
                    key={i}
                    className="px-1 text-xs font-semibold flex gap-2 border-2 rounded-md"
                    style={{
                        backgroundColor: categoria.cor,
                        color: darkenColor(categoria.cor, 40),
                        borderColor: darkenColor(categoria.cor, 40)
                    }}
                >
                    {categoria.nome}
                </span>
            ))}
        </span>
    )
}