import React, { useState } from "react";
import { Faders, MagnifyingGlass, X } from "@phosphor-icons/react";
import "./style.css";
import ViewMode from "../ViewMode";

export default function Search({ searchParams, viewMode, setViewMode, buscar }) {
    const [modalFilters, setModalFilters] = useState(false);

    const handleBuscar = () => {
        setModalFilters(false);
        buscar();
    }

    const limparSearch = () => {
        const searchFunctions = [
            'setSearchNome',
            'setSearchEmail',
            'setSearchVerifyEmail',
            'setSearchDateFim',
            'setSearchDateInicio',
            'setSearchStatus',
            'setSearchModelo',
            'setSearchAcao',
            'setSearchComunidade',
            'setSearchDisciplina',
            'setSearchCategoria',
            'setSearchStatusDenuncia',
            'setSearchType',
            'setSearchUser',
        ];
    
        if (searchParams) {
            searchFunctions.forEach(func => {
                if (typeof searchParams[func] === 'function') {
                    searchParams[func]("");
                }
            });
            buscar();
        }
    };
    

    const {
        searchNome, setSearchNome,
        searchDateInicio, setSearchDateInicio,
        searchDateFim, setSearchDateFim,
        searchStatus, setSearchStatus,
        searchEmail, setSearchEmail,
        searchVerifyEmail, setSearchVerifyEmail,
        searchModelo, setSearchModelo,
        searchAcao, setSearchAcao,
        searchComunidade, setSearchComunidade,
        searchDisciplina, setSearchDisciplina,
        searchCategoria, setSearchCategoria,
        searchStatusDenuncia, setSearchStatusDenuncia,
        searchType, setSearchType,
        searchUser, setSearchUser,
        disciplinas, categorias,
    } = searchParams;

    return (
        <div className="search-content">
            <div className="flex w-full md:w-1/2 items-center justify-center gap-1">
                <div className="flex w-full md:w-full items-center justify-center gap-1 bg-white dark:bg-neutro-500 rounded-lg">
                    <input
                        type="text"
                        className="input-search"
                        placeholder={`Pesquisar`}
                        value={searchNome}
                        onChange={(event) => setSearchNome(event.target.value)}
                        onKeyDown={(event) => { if (event.key === 'Enter') { handleBuscar(); } }}/>
                    <button
                        type="button"
                        className="btn-filter"
                        onClick={() => setModalFilters(!modalFilters)}
                        title="Filtros">
                        {modalFilters ? <X size={16} /> : <Faders size={16} />}
                    </button>
                    <button
                        type="button"
                        className="btn-search"
                        onClick={handleBuscar}
                        title="Pesquisar">
                        <MagnifyingGlass size={16} />
                    </button>
                </div>
                {viewMode &&
                    <ViewMode
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />
                }
            </div>
            {modalFilters &&
                <div className="subsearch-content">
                    <div className="row">
                        {setSearchEmail && 
                            <span className="input-group-search">
                                <label htmlFor="email" className="label-input">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={searchEmail}
                                    onChange={(event) => setSearchEmail(event.target.value)}
                                    className="input-search-date"/>
                            </span>
                        }
                        {setSearchVerifyEmail &&
                            <span className="input-group-search">
                                <label htmlFor="verifyemail" className="label-input">Email verificado</label>
                                <select
                                    name="verifyemail"
                                    id="verifyemail"
                                    className="input-search-date"
                                    onChange={(event) => setSearchVerifyEmail(event.target.value)}>
                                    <option value="" selected={searchVerifyEmail === ""}>Ambos</option>
                                    <option value="verificados" selected={searchVerifyEmail === "verificados"}>Verificado</option>
                                    <option value="nao_verificados" selected={searchVerifyEmail === "nao_verificados"}>Não Verificado</option>
                                </select>
                            </span>
                        }
                    </div>
                    
                    <div className="row">
                        {setSearchModelo && 
                            <span className="input-group-search">
                                <label htmlFor="modelo" className="label-input">Modelo</label>
                                <select
                                    name="modelo"
                                    id="modelo"
                                    className="input-search-date"
                                    onChange={(event) => setSearchModelo(event.target.value)}>
                                    <option value="" selected={searchModelo === ""}>Todos</option>
                                    <option value="Usuario" selected={searchModelo === "Usuario"}>Usuário</option>
                                    <option value="Administrador" selected={searchModelo === "Administrador"}>Administrador</option>
                                    <option value="Disciplina" selected={searchModelo === "Disciplina"}>Disciplina</option>
                                    <option value="Categoria" selected={searchModelo === "Categoria"}>Categoria</option>
                                    <option value="Anotacao" selected={searchModelo === "Anotacao"}>Anotação</option>
                                    <option value="Comentario" selected={searchModelo === "Comentario"}>Comentário</option>
                                </select>
                            </span>
                        }
                        {setSearchAcao &&
                            <span className="input-group-search">
                                <label htmlFor="acao" className="label-input">Ação</label>
                                <select
                                    name="acao"
                                    id="acao"
                                    className="input-search-date"
                                    onChange={(event) => setSearchAcao(event.target.value)}>
                                    <option value="" selected={searchAcao === ""}>Todos</option>
                                    <option value="created" selected={searchAcao === "created"}>Criar</option>
                                    <option value="updated" selected={searchAcao === "updated"}>Atualizar</option>
                                    <option value="deleted" selected={searchAcao === "deleted"}>Deletar</option>
                                    <option value="restored" selected={searchAcao === "restored"}>Restaurar</option>
                                </select>
                            </span>
                        }
                    </div>

                    <div className="row">
                        {setSearchComunidade && 
                            <span className="input-group-search">
                                <label htmlFor="comunidade" className="label-input">Comunidade</label>
                                <select
                                    name="comunidade"
                                    id="comunidade"
                                    className="input-search-date"
                                    onChange={(event) => setSearchComunidade(event.target.value)}>
                                    <option value="" selected={searchComunidade === ""}>Todas</option>
                                    <option value="1" selected={searchComunidade === "1"}>Compartilhadas</option>
                                    <option value="0" selected={searchComunidade === "0"}>Não Compartilhadas</option>
                                </select>
                            </span>
                        }
                        {setSearchDisciplina &&
                            <span className="input-group-search">
                                <label htmlFor="disciplina" className="label-input">Disciplina</label>
                                <select
                                    name="disciplina"
                                    id="disciplina"
                                    className="input-search-date"
                                    onChange={(event) => setSearchDisciplina(event.target.value)}>
                                    <option value="" selected={searchDisciplina === ""}>Todas</option>
                                    {disciplinas.map((disciplina) => (
                                        <option value={disciplina.id} selected={searchDisciplina === disciplina.id}>{disciplina.nome}</option>
                                    ))}
                                </select>
                            </span>
                        }
                        {setSearchCategoria &&
                            <span className="input-group-search">
                                <label htmlFor="categoria" className="label-input">Categoria</label>
                                <select
                                    name="categoria"
                                    id="categoria"
                                    className="input-search-date"
                                    onChange={(event) => setSearchCategoria(event.target.value)}>
                                    <option value="" selected={searchCategoria === ""}>Todas</option>
                                    {categorias.map((categoria) => (
                                        <option value={categoria.id} selected={searchCategoria === categoria.id}>{categoria.nome}</option>
                                    ))}
                                </select>
                            </span>
                        }
                    </div>

                    <div className="row">
                        {setSearchType && 
                            <span className="input-group-search">
                                <label htmlFor="type" className="label-input">Tipo</label>
                                <select
                                    name="type"
                                    id="type"
                                    className="input-search-date"
                                    onChange={(event) => setSearchType(event.target.value)}>
                                    <option value="" selected={searchType === ""}>Todos</option>
                                    {/* <option value="Usuario" selected={searchType === "Usuario"}>Usuário</option> */}
                                    {/* <option value="Administrador" selected={searchType === "Administrador"}>Administrador</option> */}
                                    {/* <option value="Disciplina" selected={searchType === "Disciplina"}>Disciplina</option> */}
                                    {/* <option value="Categoria" selected={searchType === "Categoria"}>Categoria</option> */}
                                    <option value="Anotacao" selected={searchType === "Anotacao"}>Anotação</option>
                                    <option value="Comentario" selected={searchType === "Comentario"}>Comentário</option>
                                </select>
                            </span>
                        }
                    </div>

                    <div className="row">
                        {setSearchDateInicio &&
                            <span className="input-group-search">
                                <label htmlFor="data_inicio" className="label-input">Criado a partir de</label>
                                <input
                                    type="date"
                                    name="data_inicio"
                                    id="data_inicio"
                                    value={searchDateInicio}
                                    onChange={(event) => setSearchDateInicio(event.target.value)}
                                    className="input-search-date"/>
                            </span>
                        }
                        {setSearchDateFim &&
                            <span className="input-group-search">
                                <label htmlFor="data_fim" className="label-input">Criado até</label>
                                <input
                                    type="date"
                                    name="data_fim"
                                    id="data_fim"
                                    value={searchDateFim}
                                    onChange={(event) => setSearchDateFim(event.target.value)}
                                    min={searchDateInicio}
                                    className="input-search-date"/>
                            </span>
                        }
                        {setSearchStatus &&
                            <span className="input-group-search">
                                <label
                                    htmlFor="status"
                                    className="label-input">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    id="status"
                                    className="input-search-date"
                                    onChange={(event) => setSearchStatus(event.target.value)}>
                                    <option value="" selected={searchStatus === ""}>Ativos</option>
                                    <option value="deletados" selected={searchStatus === "deletados"}>Deletados</option>
                                    <option value="ambos" selected={searchStatus === "ambos"}>Ambos</option>
                                </select>
                            </span>
                        }
                        {setSearchStatusDenuncia &&
                            <span className="input-group-search">
                                <label
                                    htmlFor="statusDenuncia"
                                    className="label-input">
                                    Status
                                </label>
                                <select
                                    name="statusDenuncia"
                                    id="status"
                                    className="input-search-date"
                                    onChange={(event) => setSearchStatusDenuncia(event.target.value)}>
                                    <option value="pendente" selected={searchStatusDenuncia === "pendente"}>Pendentes</option>
                                    <option value="resolvido" selected={searchStatusDenuncia === "resolvido"}>Resolvidos</option>
                                    <option value="rejeitado" selected={searchStatusDenuncia === "rejeitado"}>Rejeitados</option>
                                </select>
                            </span>
                        }
                    </div>
                    <div className="row justify-end">
                        <button
                            type="button"
                            className="btn-clear"
                            onClick={limparSearch}>
                            Limpar Filtros
                        </button>
                        <button
                            type="button"
                            className="btn-clear"
                            onClick={buscar}>
                            Filtrar
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}
