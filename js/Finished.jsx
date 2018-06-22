import React from 'react';
import Template from './Template.jsx';

class Finished extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            games: []
        }
    }

    componentDidMount() {

       fetch('http://api.football-data.org/v1/competitions/467/fixtures', { headers: {"X-Auth-Token": "1e265f892ce541f69195f6d45eedccc8" }  } )
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
                        { this.state.games.filter( el => el.status === 'IN_PLAY'  )
                            .map( el =>
                                <tr key={el._links.self.href}>
                                    <td> {el.date.slice(0,10)} </td>
                                    <td className="typeTD">{el.homeTeamName} : {el.awayTeamName}</td>
                                    <td className="typeTD"> {el.result.goalsHomeTeam} : {el.result.goalsAwayTeam} (mecz w trakcie)</td>
                                </tr>) }
                        { this.state.games.filter( el => el.status === 'FINISHED'  )
                            .map( el =>
                                <tr key={el._links.self.href}>
                                    <td> {el.date.slice(0,10)} </td>
                                    <td className="typeTD">{el.homeTeamName} : {el.awayTeamName}</td>
                                    <td className="typeTD"> {el.result.goalsHomeTeam} : {el.result.goalsAwayTeam}</td>
                                </tr>) }

                        </tbody>

                    </table>
                 </section>
            </Template>

        )
    }
}

module.exports = Finished;