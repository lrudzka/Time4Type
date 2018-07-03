import React from 'react';
import Template from './Template.jsx';
import FinishedRow from './FinishedRow.jsx';

let url_games = 'http://api.football-data.org/v1/competitions/';
let event_number = '467';

class Finished extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            games: [],
            search: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value
        });
    }

    componentDidMount() {

       fetch( url_games + event_number + '/fixtures', { headers: {"X-Auth-Token": "1e265f892ce541f69195f6d45eedccc8" }  } )
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
                this.setState({
                    games: games.reverse()
                })
            }).catch( err => console.log(err) );
    }

    render(){

        console.log('testET', this.state.games);

        let gamesArray = [];

        this.state.games.filter(el => el.status == 'FINISHED'|| el.status=='IN_PLAY' ).forEach ( val => {
            let extraTimeGoalsHomeTeam = val.result.extraTime ? val.result.extraTime.goalsHomeTeam : null;
            let extraTimeGoalsAwayTeam = val.result.extraTime ? val.result.extraTime.goalsAwayTeam: null;
            let penaltyHomeTeam = val.result.penaltyShootout? val.result.penaltyShootout.goalsHomeTeam: null;
            let penaltyAwayTeam = val.result.penaltyShootout? val.result.penaltyShootout.goalsAwayTeam: null;
            let matchId = val._links.self.href;
            let newRow = {
                matchId: matchId,
                homeTeamName: val.homeTeamName,
                awayTeamName: val.awayTeamName,
                resultGoalsHomeTeam: val.result.goalsHomeTeam,
                resultGoalsAwayTeam: val.result.goalsAwayTeam,
                extraTimeGoalsHomeTeam: extraTimeGoalsHomeTeam,
                extraTimeGoalsAwayTeam: extraTimeGoalsAwayTeam,
                status: val.status,
                date: val.date,
                penaltyHomeTeam: penaltyHomeTeam,
                penaltyAwayTeam: penaltyAwayTeam
            }
            gamesArray.push(newRow);
        })

        if ( this.state.search != "" ){
            gamesArray = gamesArray.filter ( el => el.homeTeamName.toUpperCase().indexOf(this.state.search.toUpperCase())>=0 ||  el.awayTeamName.toUpperCase().indexOf(this.state.search.toUpperCase())>=0  )
        }

        return(
            <Template>
                <section className="HolyGrail-content">
                    <form className="finishedForm">
                        <label>Wyszukaj drużynę:
                            <input onChange = {this.handleChange} type="text" value={this.state.search}/>
                        </label>
                    </form>
                    <table className='finished'>
                        <thead>
                            <th>DATA</th>
                            <th>DRUŻYNY</th>
                            <th>WYNIK</th>
                        </thead>
                        <tbody>
                        { gamesArray.map( el => <FinishedRow key = {el.matchId}
                                                                    date = {el.date}
                                                                    homeTeamName ={el.homeTeamName}
                                                                    awayTeamName = {el.awayTeamName}
                                                                    goalsHomeTeam = {el.resultGoalsHomeTeam}
                                                                    goalsAwayTeam = {el.resultGoalsAwayTeam}
                                                                    status = {el.status}
                                                                    penaltyHomeTeam = {el.penaltyHomeTeam}
                                                                    penaltyAwayTeam = {el.penaltyAwayTeam}
                                                                    extraTimeGoalsHomeTeam = {el.extraTimeGoalsHomeTeam}
                                                                    extraTimeGoalsAwayTeam = {el.extraTimeGoalsAwayTeam}
                                                                    />


                        )}
                        </tbody>
                    </table>
                 </section>
            </Template>

        )
    }
}

module.exports = Finished;