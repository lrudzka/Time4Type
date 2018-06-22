import React from 'react';
import Template from './Template.jsx'

class Ranking extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            usersPoints: [],
            usersTypes: [],
            games: []
        }
    }

    componentDidMount() {

        // 1. pobranie danych z obiektu types

        fetch('https://ubet-60936.firebaseio.com/types.json')
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
                    homeTeamType: data[key].homeTeamGoalsType,
                    awayTeamType: data[key].awayTeamGoalsType,
                    status: data[key].status
                }
             typesArray.push(newEl)
             }
             // ograczenie danych - bierzemy tylko te ze statusem 'open'
             this.setState({
             usersTypes: typesArray.filter(el => el.status == 'open')
             })
            }).catch(err => console.log(err))

        // 2. pobieramy dane z zewnętrznego API

        fetch('http://api.football-data.org/v1/competitions/467/fixtures', {headers: {"X-Auth-Token": "1e265f892ce541f69195f6d45eedccc8"}})
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
            // ograniczenie danych: bierzemy tylko te ze statusem 'finished'
                this.setState({
                    games: allGames.filter(el => el.status === 'FINISHED')
                })
            }).catch(err => console.log(err));

        // 4. ściągnięcie zaktualizowanych danych

        fetch('https://ubet-60936.firebaseio.com/types.json')
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            }).then(data => {
            let usersPoints = []
            for (let key in data) {
                let newEl = {
                    user: data[key].user,
                    points: data[key].points,
                    status: data[key].status
                }
                usersPoints.push(newEl)
            }
            // ograczenie danych - bierzemy tylko te ze statusem 'closed'
            this.setState({
                usersPoints: usersPoints.filter(el => el.status == 'closed')
            })
        }).catch(err => console.log(err))

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
                        console.log(this.state.usersTypes[i])
                        let calculatedPoints = 0;
                        let homeType = this.state.usersTypes[i].homeTeamType;
                        let awayType = this.state.usersTypes[i].awayTeamType;
                        let homeResult = this.state.games[j].result.goalsHomeTeam;
                        let awayResult = this.state.games[j].result.goalsAwayTeam;

                        console.log( 'homeType:'+homeType, ' awayType:'+awayType, 'homeResult:'+homeResult, ' awayResult: '+awayResult)

                        if (homeType == homeResult && awayType == awayResult) {
                            calculatedPoints = 3;
                        } else if ((homeType > awayType && homeResult > awayResult) ||
                            (homeType < awayType && homeResult < awayResult) ||
                            (homeType == awayType && homeResult == awayResult)) {
                            calculatedPoints = 1;
                        }

                        // 4. update danych w obiekcie Types -> dodajemy punkty, i zmieniamy status na 'closed'

                        fetch('https://ubet-60936.firebaseio.com/types/' + this.state.usersTypes[i].key + '.json',
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
                    }
                }
            }
        }
    }


    render(){

        let ranking = [];

        if (this.state.usersPoints.length>0) {

            let uP = this.state.usersPoints;

            for (let i=0; i<uP.length; i++) {
                let newEl = {
                    user: uP[i].user,
                    points: uP[i].points
                }

                if (i==0) {
                    ranking.push(newEl);
                } else if ( ranking.map(el => el.user.email).indexOf(uP[i].user.email)>=0 ) {
                    // użytkownik ma już naliczone punkty
                    let newPoints = uP[i].points + ranking.filter(el => el.user.email == uP[i].user.email)[0].points;
                    ranking = ranking.filter( el => el.user.email != uP[i].user.email)
                    ranking.push( {
                        user: uP[i].user,
                        points: newPoints
                    })

                } else {
                    ranking.push(newEl)
                }

            }

        }

        if (ranking.length>1) {
            ranking.sort( (a,b) => b.points - a.points )
        }

        let rankingWithRank = [];
        let prevRank = 0;

        for (let i=0; i<ranking.length; i++) {

            if ( i == 0) {

                rankingWithRank.push( {
                    user: ranking[i].user,
                    points: ranking[i].points,
                    rank: 1
                }  );
                prevRank = 1;
            } else {

                if ( ranking[i].points == ranking[i-1].points ) {

                    rankingWithRank.push( {
                        user: ranking[i].user,
                        points: ranking[i].points,
                        rank: prevRank
                    } )
                } else {
                    rankingWithRank.push( {
                        user: ranking[i].user,
                        points: ranking[i].points,
                        rank: prevRank+1
                    } )
                    prevRank = prevRank+1;
                }

            }

        }



        return(
            <Template>
                <div className="HolyGrail-content">
                    { (this.state.games.length == 0 && this.state.usersTypes.length == 0 )?<h1> Loading... </h1> : <h1> Ranking </h1> }
                        <table className="ranking">
                             <thead>
                                 <th> Miejsce </th>
                                 <th colSpan="2"> Gracz </th>
                                 <th> Liczba punktów </th>
                             </thead>
                             <tbody>
                             {rankingWithRank.map( el =>
                                <tr>
                                    <td className="rank">{el.rank}</td>
                                    <td><div className="avatar" style={ {backgroundImage: "url("+el.user.imageUrl+")" } }></div></td>
                                    <td>{el.user.name}</td>
                                    <td className="points">{el.points}</td>
                                </tr>
                             )}
                             </tbody>

                         </table>

                </div>
            </Template>
        )
    }
}

module.exports = Ranking;