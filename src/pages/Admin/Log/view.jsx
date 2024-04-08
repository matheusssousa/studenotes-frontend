import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainHeader from "../../../components/Commons/MainHeader";
import ApiAdmin from "../../../services/ApiAdmin";
import moment from 'moment';

export default function ViewLogAdminPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [log, setLog] = useState([]);
    const [dataFormat, setDataFormat] = useState('');

    const [loading, setLoading] = useState(false);

    const receiveDados = async () => {
        setLoading(true);
        try {
            const response = await ApiAdmin.get(`/log/${params.id}`);
            console.log(response)
            setLog(response.data);
            setDataFormat(moment(log.created_at).format('DD-MM-YYYY HH:mm'));
            console.log(dataFormat)
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
                page='Visualizar Log'
                text='Visualização de um log do sistema.'
            />
            <div className="form-add-edit">
                <div className="content-inputs">
                    <span className="input-group-add-edit">
                        <label htmlFor="nome" className="label-add-edit">Assunto</label>
                        <input type="text" name="nome" value={log.log_name} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                    </span>
                    <span className="input-group-add-edit">
                        <label htmlFor="action" className="label-add-edit">Ação</label>
                        <input type="text" name="action" value={log.description} className={`${loading && `animate-pulse`} input-add-edit capitalize`} disabled />
                    </span>
                    <span className="input-group-add-edit">
                        <label htmlFor="data" className="label-add-edit">Feito em</label>
                        <input type="datetime" name="data" value={dataFormat} className={`${loading && `animate-pulse`} input-add-edit`} disabled />
                    </span>
                </div>
                <div className="container-buttons-add-edit">
                    <Link to='/admin/logs' className="btn-cancel">Voltar</Link>
                </div>
            </div>
        </div>
    )
}