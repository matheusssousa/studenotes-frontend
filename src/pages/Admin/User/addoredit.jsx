import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiAdmin from "../../../services/ApiAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddOrEditUserAdminPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchUserData = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const { data } = await ApiAdmin.get(`/user/${id}`);
            setNome(data.name);
            setEmail(data.email);
        } catch (error) {
            console.error("Erro ao receber dados do usuário:", error);
            toast.error("Erro ao carregar os dados do usuário.", { theme: 'colored' });
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await ApiAdmin.put(`/user/${id}`, { name: nome, email: email });
                toast.success("Usuário atualizado com sucesso.", { theme: 'colored' });
            } else {
                await ApiAdmin.post(`/user`, { name: nome, email: email });
                toast.success("Usuário cadastrado com sucesso.", { theme: 'colored' });
            }
            navigate("/admin/usuarios");
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            toast.error(error.response?.data?.message || "Erro ao salvar os dados.", { theme: 'colored' });
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUserData();
    }, [id]);

    return (
        <div className="page-content">
            <MainHeader
                voltar='/admin/usuarios'
                page={id ? 'Editar Usuário' : 'Cadastrar Usuário'}
                text={id ? 'Editar um usuário já cadastrado.' : 'Cadastrar um novo usuário.'}
            />
            <form onSubmit={handleSubmit} className="form-add-edit">
                <div className="content-inputs">
                    <span className="input-group-add-edit">
                        <label htmlFor="nome" className="label-add-edit">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className={`input-add-edit ${loading ? 'animate-pulse' : ''}`}
                            placeholder={loading ? '' : 'Ex: Júlio Roberto'}
                            required
                        />
                    </span>
                    <span className="input-group-add-edit">
                        <label htmlFor="email" className="label-add-edit">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`input-add-edit ${loading ? 'animate-pulse' : ''}`}
                            placeholder={loading ? '' : 'Ex: julio@email.com'}
                            required
                        />
                    </span>
                </div>
                <div className="container-buttons-add-edit">
                    <Link to='/admin/usuarios' className="btn-cancel">Cancelar</Link>
                    <button type="submit" className="btn-save" disabled={loading}>
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </form>
        </div>
    );
}
