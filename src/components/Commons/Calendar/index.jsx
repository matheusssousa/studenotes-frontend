import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarBlank, CaretLeft, CaretRight } from "@phosphor-icons/react";
import moment from "moment";

import "./style.css";

export default function Calendar({ anotacoes, setDataInicio, setDataFinal }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarKey, setCalendarKey] = useState(Date.now()); // Chave única para o componente FullCalendar

    // Função para escolher qual semana mostrar
    const handleWeekChange = (direction) => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + direction * 7);
            return newDate;
        });
    };

    // Função para voltar para a semana atual
    const handleTodayClick = () => {
        setCurrentDate(new Date());
    };

    // Atualiza a chave única do componente FullCalendar sempre que currentDate é alterado
    useEffect(() => {
        setCalendarKey(Date.now());
        setDataInicio(moment(firstDayOfWeek).format('YYYY-MM-DD'));
        setDataFinal(moment(lastDayOfWeek).format('YYYY-MM-DD'));
    }, [currentDate]);

    

    // Função para verificar se há eventos para o dia
    const hasEvents = (date) => {
        if (anotacoes && anotacoes.length > 0) {
            const filteredAnotacoes = anotacoes.filter(anotacao => moment(anotacao.data_prazo).isSame(date, "day"));
            return filteredAnotacoes.length > 0 ? filteredAnotacoes.slice(0, 3) : [];
        }
        return [];  
    };

    // Função para remover o sufixo "-Feira"
    const formatDayHeader = (text) => {
        const replacements = {
            "domingo": "Domingo",
            "segunda-feira": "Segunda",
            "terça-feira": "Terça",
            "quarta-feira": "Quarta",
            "quinta-feira": "Quinta",
            "sexta-feira": "Sexta",
            "sábado": "Sábado",
        };
        return replacements[text.toLowerCase()] || text;
    };

    // Função para verificar se a data é o dia atual
    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    // Função para formatar uma data no formato "Dia - Dia, Mês"
    const formatDateRange = (startDate, endDate) => {
        const startDay = startDate.getDate();
        const endDay = endDate.getDate();
        const month = startDate.toLocaleString("default", { month: "long" });
        return `${startDay} - ${endDay} ${month}`;
    };

    // Obtém o primeiro e o último dia da semana
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    return (
        <div className="calendario">
            <div className="calendario-header">
                <p className="font-medium dark:text-neutro-100">Calendário</p>
                <div className="flex items-center gap-2">
                    <button type="button" onClick={handleTodayClick} className="button-date-atual" title="Hoje"><CalendarBlank size={15} /></button>
                    <div className="week-navigation flex gap-2">
                        <button type="button" onClick={() => handleWeekChange(-1)} className="hover:text-neutro-300 duration-150 ease-in-out"><CaretLeft size={15} /></button>
                        <span className="text-sm capitalize">{formatDateRange(firstDayOfWeek, lastDayOfWeek)}</span>
                        <button type="button" onClick={() => handleWeekChange(1)} className="hover:text-neutro-300 duration-150 ease-in-out"><CaretRight size={15} /></button>
                    </div>
                </div>
            </div>
            <FullCalendar
                key={calendarKey}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                headerToolbar={false}
                initialDate={currentDate}
                dayHeaderFormat={{ weekday: "long" }}
                dayHeaderContent={(args) => (
                    <div className={`${isToday(args.date) ? 'today' : ''} px-2 py-3`}>
                        <div className={`flex flex-col items-center gap-1`}>
                            <span>{formatDayHeader(args.text)}</span>
                            <span className="text-2xl">{args.date.getDate()}</span>
                            <div className="flex gap-1">
                                {hasEvents(args.date) && hasEvents(args.date).map((anotacao, index) => (
                                    <div className="event-dot" key={index}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                contentHeight="auto"
                locale={"pt-br"}
            />
            <div className="calendario-footer">
                
            </div>
        </div>
    );
}
