import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApiUser from "../../../services/ApiUser";
import TextEditor from "../../../components/Commons/TextEditor";

export default function AddOrEditAnotacaoUserPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);

    const [nome, setNome] = useState();
    const [texto, setTexto] = useState();

    const [loading, setLoading] = useState(false);

    const receiveDados = async () => {
        setLoading(true);
        try {
            const response = await ApiUser.get(`/anotacao/${params.id}`);
            setTexto(response.data.texto)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const receiveDadosCreate = async () => {
        setLoading(true);
        try {
            const response = await ApiUser.get(`/anotacao/create`);
            console.log(response)
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
                });
                toast.success("Anotação atualizada.", {
                    theme: 'colored',
                });
                navigate("/anotacoes");
            } catch (error) {
                return toast.error(error.response.data.message, {
                    theme: 'colored',
                });
            }
        } else {
            try {
                await ApiUser.post(`/anotacao`, {
                    nome: nome,
                    texto: texto,
                });
                toast.success("Anotação cadastrada.", {
                    theme: 'colored',
                });
                navigate("/anotacoes");
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
            <form onSubmit={(e) => enviarDados(e, params.id)} className="form-add-edit">
                <TextEditor texto={texto} setTexto={setTexto} />
                <div className="container-buttons-add-edit">
                    <Link to='/anotacoes' className="btn-cancel">Cancelar</Link>
                    <button type="submit" className="btn-save">Salvar</button>
                </div>
            </form>
        </div>
    )
}