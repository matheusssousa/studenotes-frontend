import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { X, Check, Share } from "@phosphor-icons/react";
import ApiUser from "../../../services/ApiUser";
import UploadFile from "../../../components/Commons/UploadFile";
import MultiSelect from "../../../components/Commons/MultiSelect";
import moment from "moment";
import OptionsGPT from "../../../components/Commons/OptionsGPT/index.jsx";

import "./style.css";
import { AnimatePresence } from "framer-motion";

export default function AddOrEditAnotacaoUserPage() {
    const { id } = useParams();
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
    const [useGPT, setUseGPT] = useState(false);

    const [optionsIA, setOptionsIA] = useState(false);

    const [loading, setLoading] = useState(false);

    const receiveDados = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const { data } = await ApiUser.get(`/anotacao/edit/${id}`);
            setNome(data.anotacao.nome);
            setData(data.anotacao.data_prazo ? moment(data.anotacao.data_prazo).format("YYYY-MM-DD") : data.anotacao.data_prazo);
            setTexto(data.anotacao.texto);
            setComunidade(data.anotacao.comunidade);
            setArquivos(data.anotacao.arquivos);
            if (data.anotacao.categorias.length > 0) {
                setSelectCategorias(data.anotacao.categorias.map(categoria => categoria.id));
            }
            setDisciplina(data.anotacao.disciplina);
            setCategorias(data.categorias);
            setDisciplinas(data.disciplinas);
            setUseGPT(data.anotacao.use_gpt);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao carregar os dados da anotação.", { theme: 'colored' });
        }

        setLoading(false);
    }

    const receiveDadosCreate = async () => {
        setLoading(true);
        try {
            const { data } = await ApiUser.get(`/anotacao/create`);
            setCategorias(data.categorias);
            setDisciplinas(data.disciplinas);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const enviarDados = async (e, anotacao) => {
        e.preventDefault();
        setLoading(true);
    
        const dataToSend = {
            nome: nome,
            texto: texto,
            data_prazo: data,
            disciplina_id: (disciplina && typeof disciplina === 'object' ? disciplina.id : disciplina),
            comunidade: comunidade,
            categorias: selectCategorias,
            arquivo: arquivos,
            use_gpt: useGPT,
        };
    
        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        };
    
        try {
            if (anotacao) {
                dataToSend._method = "PUT";
                const response = await ApiUser.post(`/anotacao/${anotacao}`, dataToSend, config);
                toast.success("Anotação atualizada.", { theme: 'colored' });
            } else {
                const response = await ApiUser.post(`/anotacao`, dataToSend, config);
                toast.success("Anotação cadastrada.", { theme: 'colored' });
            }
            navigate("/anotacoes");
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            toast.error(error.response?.data?.message || "Erro ao salvar os dados.", { theme: 'colored' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            receiveDadosCreate();
            receiveDados();
        } else {
            receiveDadosCreate();
        }
    }, [id])

    return (
        <div className="page-content">
            <MainHeader
                voltar="/anotacoes"
                page={id ? 'Editar Anotação' : 'Cadastrar Anotação'}
                text={id ? 'Editar uma anotação já cadastrada.' : 'Cadastrar uma nova anotação.'}
            />
            <form onSubmit={(e) => enviarDados(e, id)} className="form-add-edit-note" encType="multipart/form-data">
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
                            <span className={`toogle-button ${comunidade === 1 ? 'text-neutro-400' : 'text-neutro-300'}`}><Share size={16} /></span>
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
                            <MultiSelect categorias={categorias} selectCategorias={selectCategorias} setSelectCategorias={setSelectCategorias} loading={loading} />
                        </span>
                        <span className="input-group-add-edit-note w-full">
                            <label htmlFor="categorias" className="label-add-edit-note">Arquivos</label>
                            <UploadFile arquivos={arquivos} setArquivos={setArquivos} />
                        </span>
                    </div>
                    <div className="content-note-conteudo">
                        <span className="content-header-texto-note">
                            <label htmlFor="texto" className="label-add-edit-note">Texto</label>
                            <button onClick={() => setOptionsIA(!optionsIA)} type="button" className={`font-bold rounded bg-gradient-to-r from-azul-100 to-azul-200 px-2 italic duration-300 ease-in-out hover:from-rosa-100 hover:to-vermelho-300 bg-clip-text text-transparent relative`} disabled={optionsIA}>IA</button>
                            <AnimatePresence>
                                {optionsIA && <OptionsGPT setOptions={setOptionsIA} titulo={nome} disciplina={disciplina} anotacao={texto} setAnotacao={setTexto} setGPT={setUseGPT}/>}
                            </AnimatePresence>
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
                        <span className={`toogle-button ${comunidade === 1 ? 'text-neutro-400' : 'text-neutro-300'}`}><Share size={16} /></span>
                    </label>
                    <button type="submit" className="btn-save">Salvar</button>
                </div>
            </form >
        </div >
    )
}