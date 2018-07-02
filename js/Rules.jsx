import React from 'react';
import Template from './Template.jsx';

class Rules extends React.Component{

    render(){
        return(
            <Template>
                <div className="HolyGrail-content">
                    <div className="rulesBox">
                        <ol className="rules"> <span> Zasady typowania:</span>
                            <li> Typujemy wyniki meczów w ramach aktualnie trwającej imprezy (zakładka Home) </li>
                            <li> Aby wprowadzić i / lub przeglądać swoje typy należy zalogować się przez konto Google</li>
                            <li> Za poprawne wytypowanie wyniku gracz otrzymuje 3 punkty</li>
                            <li> Za poprawne wskazanie zwycięzcy meczu gracz otrzymuje 1 punkt</li>
                            <li> Za poprawne wytypowanie remisu gracz otrzymuje 1 punkt</li>
                            <li> Aby zmienić swój typ należy go najpierw usunąć z listy</li>
                            <li> W przypadku meczów pucharowych typujemy wynik nie uwzględniając rzutów karnych</li>
                        </ol>
                    </div>
                </div>
            </Template>

        )
    }
}

module.exports = Rules;