import React, { useState } from "react";
import ListCategorias from "../Categoria/List";

import "./style.css";

export default function MultiSelect({ categorias, selectCategorias, setSelectCategorias }) {
    const [selectedCategoria, setSelectedCategoria] = useState([]);

    const handleAdd = (valueSelect) => {
        const selectedCategoria = categorias.find((categoria) => categoria.id === parseInt(valueSelect));
        if (!selectedCategoria || selectCategorias.some((categoria) => categoria === valueSelect)) {
            return;
        }
        const selecionados = [...selectCategorias, parseInt(valueSelect)];
        setSelectCategorias(selecionados);
        setSelectedCategoria([]);
    }

    const handleRemove = (index) => {
        const selecionados = [...selectCategorias];
        selecionados.splice(index, 1);
        setSelectCategorias(selecionados);
    };

    return (
        <div className="w-full flex gap-1 items-center">
            <select name="categoria" id="select" onChange={(event) => handleAdd(event.target.value)} value={selectedCategoria} className="input-add-edit-note w-[35%]">
                <option value='' disabled selected>Selecione as categorias</option>
                {categorias.map((categoria) => (
                    <option value={categoria.id} key={categoria.id}>{categoria.nome}</option>
                ))}
            </select>
            <ListCategorias categorias={categorias} Remove={handleRemove} selectCategorias={selectCategorias}/>
        </div>
    )
}