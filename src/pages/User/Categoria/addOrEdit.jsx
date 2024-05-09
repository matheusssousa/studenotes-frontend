import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiUser from "../../../services/ApiUser";
import { toast } from "react-toastify";
import MainHeader from "../../../components/Commons/MainHeader";

export default function AddOrEditCategoriaUserPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState();
    const [cor, setCor] = useState();

    const [loading, setLoading] = useState(false);

    const receiveDados = async () => {
        setLoading(true);
        try {
            const response = await ApiUser.get(`/categoria/${params.id}`);
            setNome(response.data.nome);
            setCor(response.data.cor)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const enviarDados = async (e, categoria) => {
        e.preventDefault();
        if (categoria) {
            try {
                await ApiUser.put(`/categoria/${categoria}`, {
                    nome: nome,
                    cor: cor
                });
                toast.success("Categoria atualizada.", {
                    theme: 'colored',
                });
                navigate("/categorias");
            } catch (error) {
                return toast.error(error.response.data.message, {
                    theme: 'colored',
                });
            }
        } else {
            try {
                await ApiUser.post(`/categoria`, {
                    nome: nome,
                    cor: cor
                });
                toast.success("Categoria cadastrada.", {
                    theme: 'colored',
                });
                navigate("/categorias");
            } catch (error) {
                return toast.error(error.response.data.message, {
                    theme: 'colored',
                });
            }
        }
    }

    useEffect(() => {
        if (params.id) {
            receiveDados();
        }
    }, [params.id])
    return (
        <div className="page-content">
            <MainHeader
                voltar='/categorias'
                page={params.id ? 'Editar Categoria' : 'Cadastrar Categoria'}
                text={params.id ? 'Editar uma categoria já cadastrada.' : 'Cadastrar uma nova categoria.'}
            />
            <form onSubmit={(e) => enviarDados(e, params.id)} className="form-add-edit">
                <div className="content-inputs">
                    <span className="input-group-add-edit">
                        <label htmlFor="nome" className="label-add-edit">Nome</label>
                        <input type="text" name="nome" value={nome} onChange={(event) => setNome(event.target.value)} className={`${loading && `animate-pulse`} input-add-edit`} placeholder={loading ? '' : 'Ex: Lembrete'} required />
                    </span>
                    <span className="input-group-add-edit">
                        <label htmlFor="cor" className="label-add-edit">Cor</label>
                        <input type="color" name="cor" value={cor} onChange={(event) => setCor(event.target.value)} className={`${loading && `animate-pulse`} input-add-edit-color`} required />
                    </span>
                </div>
                <div className="container-buttons-add-edit">
                    <Link to='/categorias' className="btn-cancel">Cancelar</Link>
                    <button type="submit" className="btn-save">Salvar</button>
                </div>
            </form>
        </div>
    )
}