import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiAdmin from "../../../services/ApiAdmin";
import moment from 'moment';

export default function ViewLogAdminPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [log, setLog] = useState([]);
    const [objeto, setObjeto] = useState();

    const [loading, setLoading] = useState(false);

    const receiveDados = async () => {
        setLoading(true);
        try {
            const response = await ApiAdmin.get(`/log/${params.id}`);
            setLog(response.data);
            setObjeto(JSON.stringify(response.data.properties.attributes));
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (params.id) {
            receiveDados();
        }
    }, [params.id])

    return (
        <div className="page-content">
            <MainHeader
                voltar='admin/logs'
                page='Visualizar Log'
                text='Visualização de um log do sistema.'
            />
            <div className="form-view">
                <div className="content-inputs">
                    <div className="row">
                        <span className="input-group-add-edit">
                            <label htmlFor="id_objeto" className="label-add-edit">ID do Objeto</label>
                            <input type="text" name="id_objeto" value={log.subject_id} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                        </span>
                        <span className="input-group-add-edit">
                            <label htmlFor="id_autor" className="label-add-edit">ID do Autor</label>
                            <input type="text" name="id_autor" value={log.causer_id} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                        </span>
                    </div>
                    <div className="row">
                        <span className="input-group-add-edit">
                            <label htmlFor="nome" className="label-add-edit">Modelo</label>
                            <input type="text" name="nome" value={log.log_name} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                        </span>
                        <span className="input-group-add-edit">
                            <label htmlFor="action" className="label-add-edit">Ação</label>
                            <input type="text" name="action" value={log.description} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                        </span>
                    </div>
                    <span className="input-group-add-edit">
                        <label htmlFor="data" className="label-add-edit">Feito em</label>
                        <input type="datetime" name="data" value={moment(log.created_at).format('DD-MM-YYYY HH:mm')} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                    </span>
                    <div className="line-horizontal"/>
                    <label htmlFor="text" className="label-add-edit">Objeto</label>
                    <textarea name="action" value={objeto} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                </div>
                <div className="container-buttons-add-edit">
                    <Link to='/admin/logs' className="btn-cancel">Voltar</Link>
                </div>
            </div>
        </div>
    )
}