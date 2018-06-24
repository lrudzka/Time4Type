import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,
    Route,
    Link,
    Switch,
    NavLink  } from 'react-router-dom';
import Rules from './Rules.jsx';
import Typing from './Typing.jsx';
import Home from './Home.jsx';
import Finished from './Finished.jsx';
import UserTypes from './UserTypes.jsx';
import Ranking from './Ranking.jsx';
import '../css/style.scss';

// ***********************************************************************************
//
// adres URL do zewnętrznego API z danymi o meczach
// plus nr aktualnej imprezy
//
// ***********************************************************************************
let url_games = 'http://api.football-data.org/v1/competitions/';
let event_number = '467';


// ***********************************************************************************
//
// adres URL do obiektu Types dla danej imprezy
//
// ***********************************************************************************
let url_types = 'https://ubet-60936.firebaseio.com/types';



class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            games: [],
            usersTypes: {}
        }
    }

    componentDidMount() {

        // 1. pobranie danych z obiektu types

        fetch(url_types+'.json')
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            }).then(data => {
            let typesArray = []
            for (let key in data) {
                let newEl = {
                    key: key,
                    matchId: data[key].matchId,
                    matchDate: data[key].matchDate,
                    homeTeamType: data[key].homeTeamGoalsType,
                    awayTeamType: data[key].awayTeamGoalsType,
                    status: data[key].status
                }
                typesArray.push(newEl)
            }
            // ograczenie danych - bierzemy tylko te ze statusem 'open' oraz 'in_play'
            this.setState({
                usersTypes: typesArray.filter(el => el.status == 'open' || el.status == 'in_play')
            })
        }).catch(err => console.log(err))

        // 2. pobieramy dane z zewnętrznego API

        fetch(url_games + event_number + '/fixtures', {headers: {"X-Auth-Token": "1e265f892ce541f69195f6d45eedccc8"}})
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            }).then(data => {
            let allGames = data.fixtures.map(el => {
                return (el)
            })
            this.setState({
                games: allGames
            })
        }).catch(err => console.log(err));

    }

    componentDidUpdate(){

        // 3. Obliczenie punktów i update obiektu Types


        if (this.state.games.length>0 && this.state.usersTypes.length>0) {

            for (let i = 0; i < this.state.usersTypes.length; i++) {
                let typeMatchId = this.state.usersTypes[i].matchId;
                // dla każdego wiersza w tabeli usersTypes -> szukamy w tabeli games meczu po matchId
                for (let j = 0; j < this.state.games.length; j++) {
                    let gameMatchId = this.state.games[j]._links.self.href;
                    if ( typeMatchId === gameMatchId   ) {

                        if ( this.state.games[j].status === 'FINISHED'  ) {

                            let calculatedPoints = 0;
                            let homeType = this.state.usersTypes[i].homeTeamType;
                            let awayType = this.state.usersTypes[i].awayTeamType;
                            let homeResult = this.state.games[j].result.goalsHomeTeam;
                            let awayResult = this.state.games[j].result.goalsAwayTeam;

                            if (homeType == homeResult && awayType == awayResult) {
                                calculatedPoints = 3;
                            } else if ((homeType > awayType && homeResult > awayResult) ||
                                (homeType < awayType && homeResult < awayResult) ||
                                (homeType == awayType && homeResult == awayResult)) {
                                calculatedPoints = 1;
                            }

                            // 4. update danych w obiekcie Types -> dodajemy punkty, i zmieniamy status na 'closed'

                            fetch(url_types + "/" + this.state.usersTypes[i].key + '.json',
                                {
                                    method: 'PATCH', body: JSON.stringify({
                                        points: calculatedPoints,
                                        status: 'closed'
                                    })
                                })
                                .then(resp => {
                                    if (resp.ok) {
                                        return resp.json()
                                    } else {
                                        throw new Error("Network error")
                                    }
                                }).then(data => {
                                console.log(data)
                            }).catch(err => console.log(err));

                        } else if ( this.state.games[j].status === 'IN_PLAY' ) {

                            // update danych w obiekcie Types - zmieniamy status na 'in_play'
                            fetch(url_types + "/" + this.state.usersTypes[i].key + '.json',
                                {
                                    method: 'PATCH', body: JSON.stringify({
                                        status: 'in_play'
                                    })
                                })
                                .then(resp => {
                                    if (resp.ok) {
                                        return resp.json()
                                    } else {
                                        throw new Error("Network error")
                                    }
                                }).then(data => {
                                console.log(data)
                            }).catch(err => console.log(err));

                        }

                    }
                }
            }
        }
    }


    render(){

        return(
            <HashRouter>
                <section>
                    <Route exact path ='/' component={Home}  />
                    <Route path="/rules" component={Rules} />
                    <Route path="/typing" component = {Typing}/>
                    <Route path="/finished" component = {Finished} />
                    <Route path="/userTypes" component = {UserTypes}/>
                    <Route path="/ranking" component = {Ranking}/>
                </section>
            </HashRouter>

        )
    }
}

document.addEventListener('DOMContentLoaded', function() {



    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    )
})