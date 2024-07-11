import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiAdmin from "../../../services/ApiAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddOrEditAdminsAdminPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();

    const [loading, setLoading] = useState(false);

    const receiveDados = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const { data } = await ApiAdmin.get(`/admin/${id}`);
            setNome(data.name);
            setEmail(data.email);
        } catch (error) {
            console.error("Erro ao receber dados do admin:", error);
            toast.error("Erro ao carregar os dados do admin.", { theme: 'colored' });
        }
        setLoading(false);
    }

    const enviarDados = async (e, admin) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await ApiAdmin.put(`/admin/${admin}`, { name: nome, email: email });
                toast.success("Usuário atualizado com sucesso.", { theme: 'colored' });
            } else {
                await ApiAdmin.post(`/auth/register`, { name: nome, email: email });
                toast.success("Usuário cadastrado com sucesso.", { theme: 'colored' });
            }
            navigate("/admin/admins");
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
                voltar='/admin/admins'
                page={id ? 'Editar Administrador' : 'Cadastrar Administrador'}
                text={id ? 'Editar um administrador já cadastrado.' : 'Cadastrar um novo administrador.'}
            />
            <form onSubmit={(e) => enviarDados(e, id)} className="form-add-edit">
                <div className="content-inputs">
                    <span className="input-group-add-edit">
                        <label htmlFor="nome" className="label-add-edit">Nome</label>
                        <input type="text" name="nome" value={nome} onChange={(event) => setNome(event.target.value)} className={`${loading && `animate-pulse`} input-add-edit`} placeholder={loading ? '' : 'Ex: Júlio Roberto'} required />
                    </span>
                    <span className="input-group-add-edit">
                        <label htmlFor="email" className="label-add-edit">Email</label>
                        <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} className={`${loading && `animate-pulse`} input-add-edit`} placeholder={loading ? '' : 'Ex: julio@email.com'} required />
                    </span>
                </div>
                <div className="container-buttons-add-edit">
                    <Link to='/admin/admins' className="btn-cancel">Cancelar</Link>
                    <button type="submit" className="btn-save">Salvar</button>
                </div>
            </form>
        </div>
    )
}