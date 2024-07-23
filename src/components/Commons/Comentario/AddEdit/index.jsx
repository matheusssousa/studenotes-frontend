import React, { useState } from "react";
import ApiUser from "../../../../services/ApiUser";
import { toast } from "react-toastify";
import Loading from "../../Loading";
import "./style.css";
import LoadingMini from "../../LoadingMini";

export default function NewComentario({ anotacao, resposta_comentario_id, edit_comentario }) {
    const [comentario, setComentario] = useState('');
    const [loading, setLoading] = useState(false);

    const comentarioSubmit = async (anotacao) => {
        setLoading(true);
        try {
            const response = await ApiUser.post(`/comentario`, {
                anotacao_id: anotacao,
                comentario_id: resposta_comentario_id,
                conteudo: comentario,
            });
            toast.success("Comentário realizado.", { theme: 'colored' });
            window.location.reload(); // Recarrega a página
        } catch (error) {
            toast.error(error.message || "Erro ao realizar comentário.", { theme: 'colored' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                comentarioSubmit(anotacao);
            }} className="content-comentario">
                <textarea
                    name="comentario"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    cols="30"
                    rows="10"
                    className="input-comentario"
                    placeholder={`${resposta_comentario_id ? 'Responder...' : 'Comentar...'}`}
                ></textarea>
                <button type="submit" className="button-visualizar-anotacao">{edit_comentario ? 'Salvar' : 'Comentar'}</button>
            </form>
            {loading && <LoadingMini />}
        </>
    )
}
