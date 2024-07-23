import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiAdmin from "../../../services/ApiAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddOrEditDisciplinaAdminPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState();

    const [loading, setLoading] = useState(false);

    const receiveDados = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const { data } = await ApiAdmin.get(`/disciplina/${id}`);
            setNome(data.nome);
        } catch (error) {
            console.log(error);
            toast.error("Erro ao carregar os dados da disciplina.", { theme: 'colored' });
        }
        setLoading(false);
    }

    const enviarDados = async (e, disciplina) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await ApiAdmin.put(`/disciplina/${id}`, { name: nome });
                toast.success("Disciplina atualizada com sucesso.", { theme: 'colored' });
            } else {
                await ApiAdmin.post(`/disciplina`, { name: nome });
                toast.success("Disciplina cadastrada com sucesso.", { theme: 'colored' });
            }
            navigate("/admin/usuarios");
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
                voltar='/admin/disciplinas'
                page={id ? 'Editar Disciplina' : 'Cadastrar Disciplina'}
                text={id ? 'Editar uma disciplina já cadastrada.' : 'Cadastrar uma nova disciplina.'}
            />
            <form onSubmit={(e) => enviarDados(e, id)} className="form-add-edit">
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