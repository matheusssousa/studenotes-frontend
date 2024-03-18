import React, { useState } from "react";
import { Faders, MagnifyingGlass, X } from "@phosphor-icons/react";

import "./style.css";

export default function Search(search) {
    const [modalFilters, setModalFilters] = useState(false);

    return (
        <div className="search-content">
            <div className="flex w-full items-center justify-center gap-1">
                <input type="text" className="input-search" placeholder={`Pesquisar ${search.type}`} value={search.nome} onChange={(event) => search.setSearchNome(event.target.value)} />
                <button type="button" className="btn-filter" onClick={() => setModalFilters(!modalFilters)} title="Filtros">{modalFilters ? <X size={17} /> : <Faders size={17} />}</button>
                <button type="submit" className="btn-search" title="Pesquisar"><MagnifyingGlass size={17} /></button>
            </div>
            {modalFilters &&
                <div className="subsearch-content">
                    <div className="row">
                        {search.setSearchDateInicio &&
                            <span className="input-group-search">
                                <label htmlFor="data_inicio" className="label-input">Criado de</label>
                                <input type="date" name="data_inicio" id="data_inicio" value={search.data_inicio} onChange={(event) => search.setSearchDateInicio(event.target.value)} className="input-search-date" />
                            </span>
                        }
                        {search.setSearchDateFim &&
                            <span className="input-group-search">
                                <label htmlFor="data_fim" className="label-input">Criado até</label>
                                <input type="date" name="data_fim" id="data_fim" value={search.data_fim} onChange={(event) => search.setSearchDateFim(event.target.value)} min={search.data_inicio} className="input-search-date" />
                            </span>
                        }
                    </div>
                    <div className="row">
                        <button type="button" onClick={(event) => search.limpar(event)} className="btn-clear">Limpar campos</button>
                    </div>
                </div>
            }
        </div>
    )
}