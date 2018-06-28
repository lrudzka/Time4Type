import React from 'react';
import Template from './Template.jsx';
import Auth from './Services/Auth';
import TypeRow from './TypeRow.jsx'

let url_games = 'http://api.football-data.org/v1/competitions/';
let event_number = '467';
let url_types = 'https://ubet-60936.firebaseio.com/types';

class Typing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            games: [],
            gamesTypes: []
        }
    }

    handleSubmit = (event) => {
        // przesyłanie wprowadzonych typów do obiektu Types

        Auth.checkLogedIn();

        let typesArray = event.target.parentElement.querySelectorAll('tr.typeRow');
        let typesMatchId = [];

        for (let i=0; i<typesArray.length; i++) {
            let input1 = typesArray[i].querySelector('.inputType1').value;
            let input2 = typesArray[i].querySelector('.inputType2').value;

            if (input1.length>0 && input2.length>0 ) {

                let typeData = {
                    user: {
                            name:  localStorage.getItem('user'),
                            familyName: localStorage.getItem('familyName'),
                            imageUrl: localStorage.getItem('imageUrl'),
                            email: localStorage.getItem('userEmail')
                           },
                    matchId: typesArray[i].dataset.matchid,
                    matchDate: typesArray[i].dataset.matchdate,
                    homeTeamName: typesArray[i].dataset.hometeamname,
                    awayTeamName: typesArray[i].dataset.awayteamname,
                    homeTeamGoalsType: input1,
                    awayTeamGoalsType: input2,
                    status: 'open'
                }
                typesMatchId.push(typeData.matchId)


                fetch(url_types + '.json', { method: 'POST', body: JSON.stringify(typeData) } )
                    .then( resp => {
                        if(resp.ok){
                            return resp.json()
                        }else{
                            throw new Error("Network error")
                        }
                    }).then(data => {
                    console.log(data)
                }).catch( err => console.log(err) );


            }
        }

        let newGames = this.state.games.filter( el => typesMatchId.indexOf(el._links.self.href)<0 )
        this.setState({
            games: newGames
        })
    }

    componentWillMount(){
        Auth.checkLogedIn();

        // pobieranie danych z serwera - obiekt Types
        fetch(url_types + '.json')
            .then( resp => {
                if(resp.ok){
                    return resp.json()
                }else{
                    throw new Error("Network error")
                }
            }).then(data => {
            let typesArray = []
            for (let key in data) {
                typesArray.push(data[key])
            }
            // obróbka danych:
            //  -> pobieramy tylko matchId dla wierszy wprowadzonych przez aktualnie zalogowanego użytkownika
            this.setState({
                gamesTypes: typesArray.filter( el => el.user.email === localStorage.getItem('userEmail')).map( el => el.matchId)
            })

        }).catch( err => console.log(err) );

        // pobieranie danych z zewnętrznego API - mecze do obstawiania
        fetch(url_games + event_number + '/fixtures', { headers: {"X-Auth-Token": "1e265f892ce541f69195f6d45eedccc8" }  } )
            .then( resp => {
                if(resp.ok){
                    return resp.json()
                }else{
                    throw new Error("Network error")
                }
            }).then(data => {

            let games = data.fixtures.map( el => {
                return (
                    el)
            }   )
            // ograniczenia dla danych:
            //  -> pokazujemy mecze, które jeszcze się nie rozpoczęły

            this.setState({
                games: games.filter(el => el.status === 'TIMED')
            })
        }).catch( err => console.log(err) );

    }


    render(){

        let rowsToType = this.state.games.filter( el => this.state.gamesTypes.indexOf(el._links.self.href)<0);

        let view;

        if ( rowsToType.length ==0 ) {
            view = <thead>
                        <th colSpan="3">Na razie brak kolejnych pozycji</th>
                   </thead>
        } else {
            view = <thead>
                        <th>Data</th>
                        <th>Drużyny</th>
                        <th>Wprowadź swoje typy</th>
                  </thead>
        }

        return(
            <Template>
                <section className="HolyGrail-content">
                    <input  onClick={this.handleSubmit} className="submitType" type="submit" value="Prześlij swoje typy"/>

                    <table className="typing">
                        {view}
                        <tbody>
                        {this.state.games.filter( el => this.state.gamesTypes.indexOf(el._links.self.href)<0)
                            .map( el => <TypeRow id={el._links.self.href}
                                                 date = {el.date.slice(0,10)}
                                                 homeTeamName ={el.homeTeamName}
                                                 awayTeamName = {el.awayTeamName}
                                                 key = {el._links.self.href}    />  )

                        }
                        </tbody>
                    </table>
                </section>
            </Template>

        )
    }
}

module.exports = Typing;