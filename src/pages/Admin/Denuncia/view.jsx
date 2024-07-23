import React, { useEffect, useState } from "react";
import MainHeader from "../../../components/Commons/MainHeader";
import { Link, useParams } from "react-router-dom";
import ApiAdmin from "../../../services/ApiAdmin";
import { toast } from "react-toastify";
import moment from "moment";

export default function ViewDenunciaAdminPage() {
    const { id } = useParams();
    const [denuncia, setDenuncia] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDenunciaData = async () => {
        setLoading(true);
        try {
            const { data } = await ApiAdmin.get(`/denuncia/${id}`);
            setDenuncia(data);
        } catch (error) {
            toast.error(error || "Erro ao carregar os dados da denúncia.", { theme: 'colored' });
        }
        setLoading(false);
    }

    const handleDenuncia = async (status) => {
        setLoading(true);
        try {
            await ApiAdmin.put(`/denuncia/${id}`, { status });
            fetchDenunciaData();
            toast.success("Denúncia atualizada com sucesso.", { theme: 'colored' });
        } catch (error) {
            toast.error(error || "Erro ao atualizar a denúncia.", { theme: 'colored' });
        }
        setLoading(false);
    
    }

    useEffect(() => {
        fetchDenunciaData();
    }, [id])

    return (
        <div className="page-content">
            <MainHeader
                page='Denúncia'
                text='Visualização de uma denúncia.'
                voltar='/admin/denuncias'
            />
            <div className="form-view">
                <div className="content-inputs">
                    <div className="row">
                        <span className="input-group-add-edit">
                            <label htmlFor="id" className="label-add-edit">ID</label>
                            <input type="text" name="id" value={denuncia.id} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                        </span>
                        <span className="input-group-add-edit">
                            <label htmlFor="data_criado" className="label-add-edit">Data Denuncia</label>
                            <input type="text" name="data_criado" value={moment(denuncia.created_at).format('D/M/Y H:m')} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                        </span>
                        <span className="input-group-add-edit">
                            <label htmlFor="status" className="label-add-edit">Status</label>
                            <input type="text" name="status" value={denuncia.status} className={`${loading && `animate-pulse`} input-add-edit capitalize`} disabled />
                        </span>
                    </div>
                    <div className="row">
                        <span className="input-group-add-edit">
                            <label htmlFor="tipo_denunciado" className="label-add-edit">Tipo Denunciado</label>
                            <input type="text" name="tipo_denunciado" value={denuncia.denunciado_type} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                        </span>
                        <span className="input-group-add-edit">
                            <label htmlFor="id_denunciado" className="label-add-edit">Item denunciado ID</label>
                            <input type="text" name="id_denunciado" value={denuncia.denunciado_id} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                        </span>
                    </div>
                    <div className="line-horizontal" />
                    <label htmlFor="motivo" className="label-add-edit">Motivo</label>
                    <textarea name="motivo" value={denuncia.motivo} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                    <label htmlFor="observacao" className="label-add-edit">Observacao</label>
                    <input type="text" name="observacao" value={denuncia.observacao} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                    {denuncia.denunciado_type === 'Comentario' && (
                        <>
                            <div className="line-horizontal" />
                            <label htmlFor="comentario" className="label-add-edit">Comentário</label>
                            <textarea name="comentario" value={denuncia.item?.conteudo} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                            <div className="row">
                                <span className="input-group-add-edit">
                                    <label htmlFor="nome_autor" className="label-add-edit">Autor</label>
                                    <input type="text" name="nome_autor" value={denuncia.item?.user?.name} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                                </span>
                                <span className="input-group-add-edit">
                                    <label htmlFor="id_anotacao" className="label-add-edit">ID anotação</label>
                                    <input type="text" name="id_anotacao" value={denuncia.item?.anotacao_id} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                                </span>
                                <span className="input-group-add-edit">
                                    <label htmlFor="data_criado_item" className="label-add-edit">Criado em</label>
                                    <input type="text" name="data_criado_item" value={moment(denuncia.item?.created_at).format('D/M/Y H:m')} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                                </span>
                            </div>
                        </>
                    )}
                </div>
                <div className="container-buttons-add-edit">
                    <Link to={denuncia.link_item} className="btn-denuncia">Visualizar</Link>
                    <button type="button" onClick={() => handleDenuncia('resolvido')} className="btn-save">Resolver denúncia</button>
                    <button type="button" onClick={() => handleDenuncia('rejeitado')} className="btn-cancel">Rejeitar denúncia</button>
                </div>
            </div>
        </div>
    )
}