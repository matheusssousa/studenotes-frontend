import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiAdmin from "../../../services/ApiAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddOrEditDisciplinaAdminPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState();

    const [loading, setLoading] = useState(false);

    const receiveDados = async () => {
        setLoading(true);
        try {
            const response = await ApiAdmin.get(`/disciplina/${params.id}`);
            setNome(response.data.nome);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const enviarDados = async (e, disciplina) => {
        e.preventDefault();
        if (disciplina) {
            try {
                await ApiAdmin.put(`/disciplina/${disciplina}`, {
                    nome: nome,
                });
                toast.success("Disciplina atualizada.", {
                    theme: 'colored',
                });
                navigate("/admin/disciplinas");
            } catch (error) {
                return toast.error(error.response.data.message, {
                    theme: 'colored',
                });
            }
        } else {
            try {
                await ApiAdmin.post(`/disciplina`, {
                    nome: nome,
                });
                toast.success("Disciplina cadastrada.", {
                    theme: 'colored',
                });
                navigate("/admin/disciplinas");
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
                page={params.id ? 'Editar Disciplina' : 'Cadastrar Disciplina'}
                text={params.id ? 'Editar uma disciplina já cadastrada.' : 'Cadastrar uma nova disciplina.'}
            />
            <form onSubmit={(e) => enviarDados(e, params.id)} className="form-add-edit">
                <div className="content-inputs">
                    <span className="input-group-add-edit">
                        <label htmlFor="nome" className="label-add-edit">Nome</label>
                        <input type="text" name="nome" value={nome} onChange={(event) => setNome(event.target.value)} className={`${loading && `animate-pulse`} input-add-edit`} placeholder={loading ? '' : 'Ex: Português'} required />
                    </span>
                </div>
                <div className="container-buttons-add-edit">
                    <Link to='/admin/disciplinas' className="btn-cancel">Cancelar</Link>
                    <button type="submit" className="btn-save">Salvar</button>
                </div>
            </form>
        </div>
    )
}