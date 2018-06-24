import React from 'react';
import Template from './Template.jsx';
import FinishedRow from './FinishedRow.jsx';

let url_games = 'http://api.football-data.org/v1/competitions/';
let event_number = '467';

class Finished extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            games: []
        }
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

        return(
            <Template>
                <section className="HolyGrail-content">
                    <table className='finished'>
                        <thead>
                            <th>DATA</th>
                            <th>DRUŻYNY</th>
                            <th>WYNIK</th>
                        </thead>
                        <tbody>
                        { this.state.games.filter( el => el.status == 'FINISHED'|| el.status=='IN_PLAY')
                            .map( el => <FinishedRow key = {el._links.self.href}
                                                                    date = {el.date}
                                                                    homeTeamName ={el.homeTeamName}
                                                                    awayTeamName = {el.awayTeamName}
                                                                    goalsHomeTeam = {el.result.goalsHomeTeam}
                                                                    goalsAwayTeam = {el.result.goalsAwayTeam}
                                                                    status = {el.status}
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