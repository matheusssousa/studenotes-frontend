import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { X, Check, Share } from "@phosphor-icons/react";
import ApiUser from "../../../services/ApiUser";
import UploadFile from "../../../components/Commons/UploadFile";
import MultiSelect from "../../../components/Commons/MultiSelect";
import moment from "moment";

import "./style.css";

export default function AddOrEditAnotacaoUserPage() {
    const params = useParams();
    const navigate = useNavigate();

    const [categorias, setCategorias] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);

    const [nome, setNome] = useState();
    const [data, setData] = useState();
    const [texto, setTexto] = useState();
    const [disciplina, setDisciplina] = useState();
    const [comunidade, setComunidade] = useState(0);
    const [selectCategorias, setSelectCategorias] = useState([]);
    const [arquivos, setArquivos] = useState([]);

    const [loading, setLoading] = useState(false);

    const receiveDados = async () => {
        setLoading(true);
        try {
            const response = await ApiUser.get(`/anotacao/edit/${params.id}`);
            setNome(response.data.anotacao.nome);
            setData(response.data.anotacao.data_prazo ? moment(response.data.anotacao.data_prazo).format("YYYY-MM-DD") : response.data.anotacao.data_prazo);
            setTexto(response.data.anotacao.texto);
            setComunidade(response.data.anotacao.comunidade);
            setArquivos(response.data.anotacao.arquivos);
            if (response.data.anotacao.categorias.length > 0) {
                setSelectCategorias(response.data.anotacao.categorias.map(categoria => categoria.id));
            }
            setDisciplina(response.data.anotacao.disciplina);

            setCategorias(response.data.categorias);
            setDisciplinas(response.data.disciplinas);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    const receiveDadosCreate = async () => {
        setLoading(true);
        try {
            const response = await ApiUser.get(`/anotacao/create`);
            setCategorias(response.data.categorias);
            setDisciplinas(response.data.disciplinas);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const enviarDados = async (e, anotacao) => {
        e.preventDefault();
        if (anotacao) {
            console.log(data)
            try {
                const response = await ApiUser.post(`/anotacao/${anotacao}`, {
                    nome: nome,
                    texto: texto,
                    data_prazo: data,
                    disciplina_id: (disciplina ? disciplina.id : disciplina),
                    comunidade: comunidade,
                    categorias: selectCategorias,
                    arquivo: arquivos,
                    _method: "PUT",
                }, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                console.log(response);
                toast.success("Anotação atualizada.", {
                    theme: 'colored',
                });
                navigate("/anotacoes");
            } catch (error) {
                console.log(error)
                return toast.error(error.response.data.message, {
                    theme: 'colored',
                });
            }
        } else {
            try {
                await ApiUser.post(`/anotacao`, {
                    nome: nome,
                    texto: texto,
                    data_prazo: data,
                    disciplina_id: disciplina,
                    comunidade: comunidade,
                    categorias: selectCategorias,
                    arquivo: arquivos
                }, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                toast.success("Anotação cadastrada.", {
                    theme: 'colored',
                });
                navigate("/anotacoes");
            } catch (error) {
                console.log(error)
                return toast.error(error.response.data.message, {
                    theme: 'colored',
                });
            }
        }
    }

    useEffect(() => {
        if (params.id) {
            receiveDadosCreate();
            receiveDados();
        } else {
            receiveDadosCreate();
        }
    }, [params.id])

    return (
        <div className="page-content">
            <MainHeader
                voltar="/anotacoes"
                page={params.id ? 'Editar Anotação' : 'Cadastrar Anotação'}
                text={params.id ? 'Editar uma anotação já cadastrada.' : 'Cadastrar uma nova anotação.'}
            />
            <form onSubmit={(e) => enviarDados(e, params.id)} className="form-add-edit-note" encType="multipart/form-data">
                <div className="content-note-header">
                    <span className="input-group-add-edit-note">
                        <input type="text" name="nome" value={nome} onChange={(event) => setNome(event.target.value)} className={`${loading && `animate-pulse`} input-add-edit-note-title`} placeholder={loading ? '' : 'Digite o nome da anotação...'} required />
                    </span>
                    <div className="hidden md:flex items-center gap-2">
                        <label className={`toogle-label ${comunidade === 1 ? 'bg-azul-200' : 'bg-neutro-250'}`} title="Compartilhar">
                            <input
                                type="checkbox"
                                name="comunidade"
                                checked={comunidade === 1}
                                onChange={() => { setComunidade(comunidade === 1 ? 0 : 1) }}
                                className="hidden" />
                            <span className={`toogle-button ${comunidade === 1 ? 'text-neutro-400' : 'text-neutro-300'}`}><Share size={17} /></span>
                        </label>
                        <button type="submit" className="btn-save">Salvar</button>
                    </div>
                </div>
                <div className="col-row w-full justify-between gap-5 md:gap-32">
                    <div className="content-note-options">
                        <span className="input-group-add-edit-note w-full">
                            <label htmlFor="data" className="label-add-edit-note">Data de lembrete</label>
                            <input type="date" name="data" value={data} onChange={(event) => setData(event.target.value)} className={`${loading && `animate-pulse`} input-add-edit-note`} />
                        </span>
                        <span className="input-group-add-edit-note w-full">
                            <label htmlFor="disciplina" className="label-add-edit-note">Disciplina</label>
                            <select name="disciplina" id="disciplina" onChange={(event) => setDisciplina(event.target.value)} className={`${loading && `animate-pulse`} input-add-edit-note`}>
                                <option value="">Selecione uma disciplina</option>
                                {disciplinas.map((disciplinaOption, i) => (
                                    <option value={disciplinaOption.id} key={i} selected={!loading && disciplina && disciplinaOption.id === disciplina.id}>{disciplinaOption.nome}</option>
                                ))}
                            </select>
                        </span>
                        <span className="input-group-add-edit-note w-full">
                            <label htmlFor="categorias" className="label-add-edit-note">Categorias</label>
                            <MultiSelect categorias={categorias} selectCategorias={selectCategorias} setSelectCategorias={setSelectCategorias} loading={loading}/>
                        </span>
                        <span className="input-group-add-edit-note w-full">
                            <label htmlFor="categorias" className="label-add-edit-note">Arquivos</label>
                            <UploadFile arquivos={arquivos} setArquivos={setArquivos} />
                        </span>
                    </div>
                    <div className="content-note-conteudo">
                        <span className="content-header-texto-note">
                            <label htmlFor="texto" className="label-add-edit-note">Texto</label>
                            {/* <button type="button" className="btn-ai">IA</button> */}
                        </span>
                        <textarea name="texto" id="texto" value={texto} onChange={(event) => setTexto(event.target.value)} className={`${loading && `animate-pulse`} text-area`} placeholder={loading ? '' : 'Digite sua anotação aqui...'} />
                    </div>
                </div>
                <div className="content-note-footer">
                    <label className={`toogle-label ${comunidade === 1 ? 'bg-azul-200' : 'bg-neutro-250'}`} title="Compartilhar">
                        <input
                            type="checkbox"
                            name="comunidade"
                            checked={comunidade === 1}
                            onChange={() => { setComunidade(comunidade === 1 ? 0 : 1) }}
                            className="hidden" />
                        <span className={`toogle-button ${comunidade === 1 ? 'text-neutro-400' : 'text-neutro-300'}`}><Share size={17} /></span>
                    </label>
                    <button type="submit" className="btn-save">Salvar</button>
                </div>
            </form >
        </div >
    )
}