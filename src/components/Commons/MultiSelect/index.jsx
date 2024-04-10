import React, { useState } from "react";
import ListCategorias from "../Categoria/List";

import "./style.css";

export default function MultiSelect(params) {
    console.log(params)
    const [selectedCategoria, setSelectedCategoria] = useState('');

    const Add = (valueSelect) => {
        const selectedCategoria = params.categorias.find((categoria) => categoria.id == valueSelect);
        if (!selectedCategoria) {
            return;
        }

        if (!params.selectCategorias.some((categoria) => categoria.id === selectedCategoria.id)) {
            const selecionados = [...params.selectCategorias];
            selecionados.push(selectedCategoria);
            params.setSelectCategorias(selecionados);
        }
        setSelectedCategoria('');
    }

    const Remove = (index) => {
        const selecionados = [...params.selectCategorias];
        selecionados.splice(index, 1);
        params.setSelectCategorias(selecionados);
    };

    return (
        <div className="w-full flex gap-1 items-center">
            <select name="categoria" id="select" onChange={(event) => Add(event.target.value)} value={selectedCategoria} className="input-add-edit-note w-[35%]">
                <option value="" disabled selected>Selecione as categorias</option>
                {params.categorias.map((categoria, i) => (
                    <option value={categoria.id} key={i}>{categoria.nome}</option>
                ))}
            </select>
            <ListCategorias categorias={params.categorias} Remove={Remove} selectCategorias={params.selectCategorias} />
        </div>
    )
}