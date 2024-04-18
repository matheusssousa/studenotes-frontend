import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { X, Check } from "@phosphor-icons/react";
import ApiUser from "../../../services/ApiUser";

import "./style.css";
import UploadFile from "../../../components/Commons/UploadFile";
import MultiSelect from "../../../components/Commons/MultiSelect";

export default function AddOrEditAnotacaoUserPage() {
    const params = useParams();
    const navigate = useNavigate();

    const [categorias, setCategorias] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);

    const [nome, setNome] = useState();
    const [data, setData] = useState();
    const [texto, setTexto] = useState();
    const [disciplina, setDisciplina] = useState();
    const [comunidade, setComunidade] = useState();
    const [selectCategorias, setSelectCategorias] = useState([]);
    const [arquivos, setArquivos] = useState([]);

    const [loading, setLoading] = useState(false);

    const receiveDados = async () => {
        setLoading(true);
        try {
            const response = await ApiUser.get(`/anotacao/${params.id}`);
            console.log(response);
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
            try {
                await ApiUser.put(`/anotacao/${anotacao}`, {
                    nome: nome,
                    texto: texto,
                    data_prazo: data,
                    disciplina_id: disciplina,
                    comunidade: comunidade,
                    categorias: selectCategorias,
                    arquivo: arquivos
                },{
                    headers: { "Content-Type": "multipart/form-data" }
                });
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
                },{
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
            receiveDados();
        } else {
            receiveDadosCreate();
        }
    }, [params.id])

    return (
        <div className="page-content">
            <MainHeader
                page={params.id ? 'Editar Anotação' : 'Cadastrar Anotação'}
                text={params.id ? 'Editar uma anotação já cadastrada.' : 'Cadastrar uma nova anotação.'}
            />
            <form onSubmit={(e) => enviarDados(e, params.id)} className="form-add-edit-note" encType="multipart/form-data">
                <div className="content-note-header">
                    <span className="input-group-add-edit-note">
                        <input type="text" name="nome" value={nome} onChange={(event) => setNome(event.target.value)} className={`${loading && `animate-pulse`} input-add-edit-note-title`} placeholder={loading ? '' : 'Digite o título da sua anotação...'} required />
                    </span>
                    {/* <div className="line-horizontal" /> */}
                </div>
                <div className="content-note-options">
                    <div className="row">
                        <span className="input-group-add-edit-note w-full md:w-[20%]">
                            <label htmlFor="data" className="label-add-edit-note">Definir lembrete</label>
                            <input type="date" name="data" value={data} onChange={(event) => setData(event.target.value)} className={`${loading && `animate-pulse`} input-add-edit-note`} />
                        </span>
                        <span className="input-group-add-edit-note w-full md:w-[30%]">
                            <label htmlFor="disciplina" className="label-add-edit-note">Disciplina</label>
                            <select name="disciplina" id="disciplina" onChange={(event) => setDisciplina(event.target.value)} className={`${loading && `animate-pulse`} input-add-edit-note`}>
                                <option value='' selected>Selecione uma disciplina</option>
                                {disciplinas.map((disciplina, i) => (
                                    <option value={disciplina.id} key={i}>{disciplina.nome}</option>
                                ))}
                            </select>
                        </span>
                        <span className="group-input-comunidade">
                            <p className="label-add-edit-note">Compartilhar</p>
                            <label className={`toogle-label ${comunidade === 1 ? 'bg-azul-200' : 'bg-neutro-300'}`}>
                                <input
                                    type="checkbox"
                                    name="comunidade"
                                    checked={comunidade === 1}
                                    onChange={() => { setComunidade(comunidade === 1 ? 0 : 1) }}
                                    className="hidden" />
                                <span className={`toogle-button ${comunidade === 1 ? 'translate-x-6 text-azul-200' : 'text-neutro-300'}`}>{comunidade !== 1 ? <X size={12} weight="bold" /> : <Check size={12} weight="bold" />}</span>
                            </label>
                        </span>
                        <span className="input-group-add-edit-note w-full md:w-[60%]">
                            <label htmlFor="categorias" className="label-add-edit-note">Categorias</label>
                            <MultiSelect categorias={categorias} selectCategorias={selectCategorias} setSelectCategorias={setSelectCategorias} />
                        </span>
                    </div>
                    <div className="line-horizontal" />
                </div>
                <div className="content-note-conteudo">
                    <span className="content-header-texto-note">
                        <label htmlFor="texto" className="label-add-edit-note">Texto</label>
                        <button type="button" className="btn-ai">IA</button>
                    </span>
                    <textarea name="texto" id="texto" value={texto} onChange={(event) => setTexto(event.target.value)} className={`${loading && `animate-pulse`} text-area`} placeholder={loading ? '' : 'Digite sua anotação aqui...'} />
                    <div className="line-horizontal" />
                    <span className="input-group-add-edit">
                        <label htmlFor="categorias" className="label-add-edit-note">Arquivos</label>
                        <UploadFile arquivos={arquivos} setArquivos={setArquivos} />
                    </span>
                </div>
                <div className="container-buttons-add-edit mt-5">
                    <Link to='/anotacoes' className="btn-cancel">Cancelar</Link>
                    <button type="submit" className="btn-save">Salvar</button>
                </div>
            </form >
        </div >
    )
}