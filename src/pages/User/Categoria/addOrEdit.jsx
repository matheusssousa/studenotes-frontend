import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiUser from "../../../services/ApiUser";
import { toast } from "react-toastify";
import MainHeader from "../../../components/Commons/MainHeader";

export default function AddOrEditCategoriaUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState();
    const [cor, setCor] = useState();

    const [loading, setLoading] = useState(false);

    const receiveDados = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const { data } = await ApiUser.get(`/categoria/${id}`);
            setNome(data.nome);
            setCor(data.cor)
        } catch (error) {
            console.error("Erro ao receber dados da categoria:", error);
            toast.error("Erro ao carregar os dados da categoria.", { theme: 'colored' });
        }
        setLoading(false);
    }

    const enviarDados = async (e, categoria) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await ApiUser.put(`/categoria/${categoria}`, { nome: nome, cor: cor });
                toast.success("Categoria atualizada com sucesso.", { theme: 'colored' });
            } else {
                await ApiUser.post(`/categoria`, { nome: nome, cor: cor });
                toast.success("Categoria cadastrada com sucesso.", { theme: 'colored' });
            }
            navigate("/categorias");
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            toast.error(error.response?.data?.message || "Erro ao salvar os dados.", { theme: 'colored' });
        }
        setLoading(false);
    }

    useEffect(() => {
        receiveDados();
    }, [id])

    return (
        <div className="page-content">
            <MainHeader
                voltar='/categorias'
                page={id ? 'Editar Categoria' : 'Cadastrar Categoria'}
                text={id ? 'Editar uma categoria já cadastrada.' : 'Cadastrar uma nova categoria.'}
            />
            <form onSubmit={(e) => enviarDados(e, id)} className="form-add-edit">
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