import React from 'react';
import Template from './Template.jsx';

class Rules extends React.Component{

    render(){
        return(
            <Template>
                <div className="HolyGrail-content">
                    <ol className="rules"> <span> Zasady typowania:</span>
                        <li> Typujemy wyniki meczów w ramach aktualnie trwającej imprezy (zakładka Home) </li>
                        <li> Za poprawnie wytypowany wynik gracz otrzymuje 3 punkty</li>
                        <li> Za poprawne wskazanie zwycięzcy meczu lub za poprawne wytypowanie remisu gracz otrzymuje 1 pkt</li>
                        <li> Aby zmienić wprowadzony typ należy go usunąć z tabeli z typami i następnie wprowadzić go ponownie</li>
                    </ol>
                </div>
            </Template>

        )
    }
}

module.exports = Rules;