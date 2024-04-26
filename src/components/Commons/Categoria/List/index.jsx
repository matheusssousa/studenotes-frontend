import React, { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";
import adjustColor from "../../../../hooks/AdjustColor";

export default function ListCategorias({ categorias, selectCategorias, Remove }) {
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);

    const darkenColor = (hex, percent) => {
        const dark = adjustColor(hex, percent);
        return dark;
    };

    useEffect(() => {
        const categoriasFiltradas = categorias.filter(categoria => selectCategorias.includes(categoria.id));
        setCategoriasSelecionadas(categoriasFiltradas);
    }, [selectCategorias]);

    return (
        <div className="flex gap-2 flex-wrap w-full h-28">
            {categoriasSelecionadas.map((categoria, i) => (
                <span key={i} className="px-2 py-1 text-xs font-semibold flex items-center gap-2 border-2 rounded-md h-fit w-fit"
                    style={{
                        backgroundColor: `${categoria.cor}`,
                        color: darkenColor(categoria.cor, 40),
                        borderColor: darkenColor(categoria.cor, 40)
                    }}>
                    {categoria.nome}
                    <button type="button" onClick={() => Remove(i)} className="hover:drop-shadow-md duration-200 ease-in">
                        <X size={13} />
                    </button>
                </span>
            ))}
        </div>
    );
}