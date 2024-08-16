import React from 'react';
import './style.css';
import { ChatTeardropText, ExclamationMark, Heart, Link } from '@phosphor-icons/react';

export default function Notification({ notification }) {
    
    const setIconNotification = (type) => {
        switch (type) {
            case 'Curtida':
                return <Heart size={16} />
            case 'Comentario':
                return <ChatTeardropText size={16} />
            case 'Resposta':
                return <ChatTeardropText size={16} />
            case 'Denuncia':
                return <ExclamationMark size={16} />
        }
    }

    return (
        <Link to={`/comunidade/view/${notification.object_id}`} className="notification">
            {setIconNotification(notification.object_type)}
            <p>{notification.user_causer_id.name} {notification.message}.</p>
        </Link>
    );
}