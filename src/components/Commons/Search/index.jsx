import React, { useState } from "react";
import { Faders, MagnifyingGlass, X } from "@phosphor-icons/react";

import "./style.css";
import ViewMode from "../ViewMode";

export default function Search(search) {
    const [modalFilters, setModalFilters] = useState(false);

    const buscar = () => {
        setModalFilters(false);
        search.buscar();
    }

    return (
        <div className="search-content">
            <div className="flex w-full md:w-1/2 items-center justify-center gap-1">
                <div className="flex w-full md:w-full items-center justify-center gap-1 bg-white dark:bg-neutro-500 rounded-lg">
                    <input type="text" className="input-search" placeholder={`Pesquisar ${search.type}`} value={search.nome} onChange={(event) => search.setSearchNome(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { search.buscar(); } }} />
                    <button type="button" className="btn-filter" onClick={() => setModalFilters(!modalFilters)} title="Filtros">{modalFilters ? <X size={16} /> : <Faders size={16} />}</button>
                    <button type="button" className="btn-search" onClick={buscar} title="Pesquisar"><MagnifyingGlass size={16} /></button>
                </div>
                {search.viewMode &&
                    <ViewMode
                        viewMode={search.viewMode}
                        setViewMode={search.setViewMode}
                    />
                }
            </div>
            {modalFilters &&
                <div className="subsearch-content">
                    <div className="row">
                        {search.disciplinas &&
                            <span className="input-group-search">
                                <label htmlFor="disciplina" className="label-input">Disciplina</label>
                                <select name="disciplina" id="disciplina" className="input-search-date" onChange={(event) => search.setSearchDisciplina(event.target.value)}>
                                    <option defaultValue={''} selected={search.setSearchDisciplina === ""}>Todas</option>
                                    {search.disciplinas.map((disciplina, i) => (
                                        <option value={disciplina.id} key={i} selected={search.disciplina == disciplina.id}>{disciplina.nome}</option>
                                    ))}
                                </select>
                            </span>
                        }
                        {search.categorias &&
                            <span className="input-group-search">
                                <label htmlFor="categoria" className="label-input">Categoria</label>
                                <select name="categoria" id="categoria" className="input-search-date" onChange={(event) => search.setSearchCategoria(event.target.value)}>
                                    <option defaultValue={''} selected={search.setSearchCategoria === ""}>Todas</option>
                                    {search.categorias.map((categoria, i) => (
                                        <option value={categoria.id} key={i} selected={search.categoria == categoria.id}>{categoria.nome}</option>
                                    ))}
                                </select>
                            </span>
                        }
                        {search.setSearchComunidade &&
                            <span className="input-group-search">
                                <label htmlFor="comunidade" className="label-input">Compartilhado</label>
                                <select name="comunidade" id="comunidade" className="input-search-date" onChange={(event) => search.setSearchComunidade(event.target.value)}>
                                    <option value="" selected={search.comunidade === ""}>Tudo</option>                                    
                                    <option value="1" selected={search.comunidade === "1"}>Compartilhados</option>                                    
                                    <option value="0" selected={search.comunidade === "0"}>Não Compartilhados</option>                                    
                                </select>
                            </span>
                        }
                    </div>
                    <div className="row">
                        {search.setSearchVerifyEmail &&
                            <span className="input-group-search">
                                <label htmlFor="verifyemail" className="label-input">Email verificado</label>
                                <select name="verifyemail" id="verifyemail" className="input-search-date" onChange={(event) => search.setSearchVerifyEmail(event.target.value)}>
                                    <option defaultValue selected={search.verifyemail === ""}>Ambos</option>
                                    <option value="verificados" selected={search.verifyemail === "verificados"}>Verificado</option>
                                    <option value="nao_verificados" selected={search.verifyemail === "nao_verificados"}>Não Verifificado</option>
                                </select>
                            </span>
                        }
                    </div>
                    <div className="row">
                        {search.setSearchDateInicio &&
                            <span className="input-group-search">
                                <label htmlFor="data_inicio" className="label-input">Criado a partir de</label>
                                <input type="date" name="data_inicio" id="data_inicio" value={search.data_inicio} onChange={(event) => search.setSearchDateInicio(event.target.value)} className="input-search-date" />
                            </span>
                        }
                        {search.setSearchDateFim &&
                            <span className="input-group-search">
                                <label htmlFor="data_fim" className="label-input">Criado até</label>
                                <input type="date" name="data_fim" id="data_fim" value={search.data_fim} onChange={(event) => search.setSearchDateFim(event.target.value)} min={search.data_inicio} className="input-search-date" />
                            </span>
                        }
                        {search.setSearchStatus &&
                            <span className="input-group-search">
                                <label htmlFor="status" className="label-input">Status</label>
                                <select name="status" id="status" className="input-search-date" onChange={(event) => search.setSearchStatus(event.target.value)}>
                                    <option defaultValue selected={search.status === ""}>Ativos</option>
                                    <option value="deletados" selected={search.status === "deletados"}>Excluídos</option>
                                    <option value="ambos" selected={search.status === "ambos"}>Ambos</option>
                                </select>
                            </span>
                        }
                    </div>
                    <div className="row flex justify-end">
                        <button type="button" onClick={(event) => search.limpar(event)} className="btn-clear">Limpar</button>
                        <button type="submit" onClick={buscar} className="btn-clear">Filtrar</button>
                    </div>
                </div>
            }
        </div>
    )
}