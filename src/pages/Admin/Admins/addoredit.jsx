import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiAdmin from "../../../services/ApiAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddOrEditAdminsAdminPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();

    const [loading, setLoading] = useState(false);

    const receiveDados = async () => {
        setLoading(true);
        try {
            const response = await ApiAdmin.get(`/admin/${params.id}`);
            setNome(response.data.name);
            setEmail(response.data.email);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const enviarDados = async (e, admin) => {
        e.preventDefault();
        if (admin) {
            try {
                await ApiAdmin.put(`/admin/${admin}`, {
                    nome: nome,
                    email: email,
                });
                toast.success("Administrador atualizada.", {
                    theme: 'colored',
                });
                navigate("/admin/admins");
            } catch (error) {
                return toast.error(error.response.data.message, {
                    theme: 'colored',
                });
            }
        } else {
            try {
                await ApiAdmin.post(`/auth/register`, {
                    name: nome,
                    email: email,
                });
                toast.success("Administrador cadastrado.", {
                    theme: 'colored',
                });
                navigate("/admin/admins");
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
                page={params.id ? 'Editar Administrador' : 'Cadastrar Administrador'}
                text={params.id ? 'Editar um administrador já cadastrado.' : 'Cadastrar um novo administrador.'}
            />
            <form onSubmit={(e) => enviarDados(e, params.id)} className="form-add-edit">
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