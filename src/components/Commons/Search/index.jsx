import React, { useState } from "react";
import { Faders, X } from "@phosphor-icons/react";

import "./style.css";

export default function Search(search) {
    const [modalFilters, setModalFilters] = useState(false);

    return (
        <div className="search-content">
            <div className="flex w-full items-center justify-center gap-1">
                <input type="text" className="input-search" placeholder={`Pesquisar ${search.type}`} onChange={(event) => search.nome(event.target.value)}/>
                <button type="button" className="btn-filter" onClick={() => setModalFilters(!modalFilters)} title="Filtros">{modalFilters ? <X size={17} /> : <Faders size={17} />}</button>
            </div>
            {modalFilters &&
                <div className="subsearch-content">
                    <button type="submit">Pesquisar</button>
                </div>
            }
        </div>
    )
}