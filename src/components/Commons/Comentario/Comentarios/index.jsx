import React, { useState } from "react";
import NewComentario from "../AddEdit/index";
import Comentario from "../ViewComentario";
import { useAuth } from "../../../../context/Authenticate/AuthContext";
import ApiUser from "../../../../services/ApiUser";
import { toast } from "react-toastify";
import "./style.css";
import ApiAdmin from "../../../../services/ApiAdmin";

export default function Comentarios({ comentarios, anotacao }) {
    const { user, admin } = useAuth();
    const api = admin ? ApiAdmin : ApiUser;
    const [respostas, setRespostas] = useState({});
    const [viewRespostas, setViewRespostas] = useState({});
    const [editComentario, setEditComentario] = useState({});
    const [responderComentario, setResponderComentario] = useState({});
    const [loading, setLoading] = useState(false);

    const toggleRespostas = async (id) => {
        if (!viewRespostas[id]) {
            setLoading(true);
            try {
                const response = await api.get(`/comentario/respostas/${id}`);
                setRespostas(prevState => ({
                    ...prevState,
                    [id]: response.data
                }));
            } catch (error) {
                toast.error(error.message || "Erro ao carregar respostas.", { theme: 'colored' });
            } finally {
                setLoading(false);
            }
        }
        setViewRespostas(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const toggleEditComentario = (id) => {
        setEditComentario(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const toggleResponderComentario = (id) => {
        setResponderComentario(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleDenunciar = (id) => {
        toast.info("Denúncia enviada.", { theme: 'colored' });
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/comentario/${id}`);
            toast.success("Comentário excluído.", { theme: 'colored' });
            window.location.reload();
        } catch (error) {
            toast.error(error.message || "Erro ao excluir comentário.", { theme: 'colored' });
        }
    };

    return (
        <div className="content-comentarios">
            <NewComentario anotacao={anotacao} />
            {comentarios.map((comentario, index) => (
                <Comentario
                    key={index}
                    comentario={comentario}
                    user={(admin ? admin : user)}
                    toggleRespostas={toggleRespostas}
                    toggleEditComentario={toggleEditComentario}
                    toggleResponderComentario={toggleResponderComentario}
                    handleDenunciar={handleDenunciar}
                    handleDelete={handleDelete}
                    viewRespostas={viewRespostas}
                    editComentario={editComentario}
                    responderComentario={responderComentario}
                    respostas={respostas[comentario.id]}
                    anotacao={anotacao}
                    loading={loading}
                />
            ))}
        </div>
    );
}
