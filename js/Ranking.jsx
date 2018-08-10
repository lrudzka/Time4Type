import React from 'react';
import Template from './Template.jsx'
import FetchService from './Services/FetchService';


class Ranking extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            usersPointsLoaded: false,
            usersPoints: []
        }
    }

    componentDidMount() {

        // ściągnięcie danych z obiektu Types

        FetchService.getTypesData( data => {
            let usersPoints = []
            for (let key in data) {
                let newEl = {
                    user: data[key].user,
                    points: data[key].points,
                    status: data[key].status
                }
                usersPoints.push(newEl)
            }
            // ograniczenie danych - bierzemy tylko te ze statusem 'closed'
            this.setState({
                usersPointsLoaded: true,
                usersPoints: usersPoints.filter(el => el.status == 'closed')          })
        } )
    }

    render(){

        let pointsArray = [];

        if (this.state.usersPoints.length>0) {

            let uP = this.state.usersPoints;

            for (let i=0; i<uP.length; i++) {
                let newEl = {
                    user: uP[i].user,
                    points: uP[i].points
                }

                if (i==0) {
                    pointsArray.push(newEl);
                } else if ( pointsArray.map(el => el.user.email).indexOf(uP[i].user.email)>=0 ) {
                    // użytkownik ma już naliczone punkty
                    let newPoints = uP[i].points + pointsArray.filter(el => el.user.email == uP[i].user.email)[0].points;
                    pointsArray = pointsArray.filter( el => el.user.email != uP[i].user.email)
                    pointsArray.push( {
                        user: uP[i].user,
                        points: newPoints
                    })

                } else {
                    pointsArray.push(newEl)
                }

            }

        }

        if (pointsArray.length>1) {
            pointsArray.sort( (a,b) => b.points - a.points )
        }

        let ranking = [];
        let prevRank = 0;

        for (let i=0; i<pointsArray.length; i++) {

            if ( i == 0) {

                ranking.push( {
                    user: pointsArray[i].user,
                    points: pointsArray[i].points,
                    rank: 1
                }  );
                prevRank = 1;
            } else {

                if ( pointsArray[i].points == pointsArray[i-1].points ) {

                    ranking.push( {
                        user: pointsArray[i].user,
                        points: pointsArray[i].points,
                        rank: prevRank
                    } )
                } else {
                    ranking.push( {
                        user: pointsArray[i].user,
                        points: pointsArray[i].points,
                        rank: prevRank+1
                    } )
                    prevRank = prevRank+1;
                }

            }

        }

        return(
            <Template>
                <div className="HolyGrail-content">
                    { this.state.usersPointsLoaded == false? <h1> Loading... </h1> : <h1> Ranking </h1> }
                        <table className="ranking">
                             <thead>
                                 <th> Miejsce </th>
                                 <th colSpan="2"> Gracz </th>
                                 <th> Liczba punktów </th>
                             </thead>
                             <tbody>
                             {ranking.map( el =>
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