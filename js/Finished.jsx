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

        let gamesArray = this.state.games.filter(el => el.status == 'FINISHED'|| el.status=='IN_PLAY' );


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
                        { gamesArray.map( el => <FinishedRow key = {el._links.self.href}
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