import React, { useEffect, useState } from "react";
import ListCategorias from "../Categoria/List";

import "./style.css";

export default function MultiSelect({ categorias, selectCategorias, setSelectCategorias, loading }) {
    const [selectedCategoria, setSelectedCategoria] = useState([]);

    const handleAdd = (valueSelect) => {
        const selectedCategoria = categorias.find((categoria) => categoria.id === parseInt(valueSelect));
        if (!selectedCategoria || selectCategorias.some((categoria) => categoria === valueSelect)) {
            return;
        }
        const selecionados = [...selectCategorias, selectedCategoria.id];
        setSelectCategorias(selecionados);
        setSelectedCategoria([]);
    }

    const handleRemove = (index) => {
        const selecionados = [...selectCategorias];
        selecionados.splice(index, 1);
        setSelectCategorias(selecionados);
    };

    return (
        <div className="w-full flex flex-col gap-2 items-center">
            <select name="categoria" id="select" onChange={(event) => handleAdd(event.target.value)} value={selectedCategoria} className={`${loading && `animate-pulse`} input-add-edit-note w-full`}>
                <option value='' disabled selected>Selecione as categorias</option>
                {categorias.map((categoria) => (
                    <option value={categoria.id} key={categoria.id} disabled={selectCategorias.find(cat => cat === categoria.id)}>{categoria.nome}</option>
                ))}
            </select>
            <ListCategorias categorias={categorias} Remove={handleRemove} selectCategorias={selectCategorias}/>
        </div>
    )
}
