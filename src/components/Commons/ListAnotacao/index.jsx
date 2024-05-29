import React from "react";
import CardAnotacaoCalendar from "../Anotacao/CardCalendar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./style.css";
import moment from "moment";

export default function ListAnotacao(params) {
    const anotacoesHoje = params.anotacao.filter((anotacao) => moment(anotacao.data_prazo).format('YYYY-MM-DD') == new moment(Date()).format('YYYY-MM-DD'));
    const anotacoesOutrosDias = params.anotacao.filter((anotacao) => moment(anotacao.data_prazo).format('YYYY-MM-DD') !== new moment(Date()).format('YYYY-MM-DD'));

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        swipeToSlide: false,
        arrows: false,
        pauseOnHover: false,
        vertical: true,
        verticalSwiping: true,
        fade: true,
    }

    return (
        <div className="list-anotacao">
            <div className="w-[40%] h-full flex items-center justify-center">
                {anotacoesHoje.length > 0 ? (
                    <Slider {...settings} className="w-full">
                        {anotacoesHoje.map((anotacao) => (
                            <CardAnotacaoCalendar anotacao={anotacao} />
                        ))}
                    </Slider>
                ) : (
                    <p className="text-xs text-neutro-300">Não há anotações para hoje.</p>
                )}
            </div>
            <div className="w-px h-2/3 bg-neutro-300 bg-opacity-50" />
            <div className="max-w-[60%] max-h-full flex gap-3 items-center">
                {anotacoesOutrosDias.length > 0 ? (
                    // <div className="slider">
                        anotacoesOutrosDias.map((anotacao) => (
                            <CardAnotacaoCalendar anotacao={anotacao} />
                        ))
                    // </div> 
                ) : (
                    <p className="text-xs text-neutro-300 text-center">Não há anotações para outros dias.</p>
                )}
            </div>
        </div>
    );
}