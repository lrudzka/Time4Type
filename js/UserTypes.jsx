import React from 'react';
import Template from './Template.jsx';
import Auth from './Services/Auth';
import UserTypesRow from './UserTypesRow.jsx'

let url_types = 'https://ubet-60936.firebaseio.com/types';

class UserTypes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userTypes: {}
        }
    }


    componentDidMount() {

        Auth.checkLogedIn();

        // pobieranie danych z serwera - tabela TYPES
        fetch(url_types + '.json')
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            }).then(data => {
                this.setState({
                    userTypes: data
                })
        }).catch(err => console.log(err));
    }

    handleClickDelete = (key) => {
        // usunięcie wybranego wiersza
        fetch(url_types +'/'+key+'.json', {method: 'delete'})
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Network error")
                }
            }).then(data => {
                delete this.state.userTypes[key];
                this.setState({
                    userTypes: this.state.userTypes
                })
            }).catch(err => console.log(err));

    }


    render(){
        let newRow = []
        for (let key in this.state.userTypes) {
            if ( this.state.userTypes[key].user.email == localStorage.getItem('userEmail') ) {
                let newEl = {
                    "key": key,
                    "homeTeamName": this.state.userTypes[key].homeTeamName,
                    "awayTeamName": this.state.userTypes[key].awayTeamName,
                    "homeTeamType": this.state.userTypes[key].homeTeamGoalsType,
                    "awayTeamType": this.state.userTypes[key].awayTeamGoalsType,
                    "matchDate": this.state.userTypes[key].matchDate,
                    "status": this.state.userTypes[key].status,
                    "points": this.state.userTypes[key].points
                }
                newRow.push(newEl)
            }
        }


        newRow.sort( (a,b) => {
            if (a.matchDate < b.matchDate) {
                return -1
            } return 1
        } )


        let newRowOpen = newRow.filter( el => el.status == 'open' || el.status == 'in_play' );
        let newRowClosed = newRow.filter( el => el.status == 'closed');

        return(
            <Template>
                <div className="HolyGrail-content">
                   <h1 className='userTypes'>Typy otwarte:</h1>
                        <table className='userTypesTable'>
                            <thead>
                                <th>Data</th>
                                <th>Drużyny</th>
                                <th>Typowany wynik</th>
                                <th> Usuwanie wpisu  </th>
                            </thead>
                            <tbody>
                                {newRowOpen.length ==0?
                                    <tr>
                                        <td colSpan="4"> Brak wpisów </td>
                                    </tr> :
                                 newRowOpen.map(el=> <UserTypesRow key={el.key}
                                                                id={el.key}
                                                              date={el.matchDate}
                                                              homeTeamName={el.homeTeamName}
                                                              awayTeamName={el.awayTeamName}
                                                              homeTeamType={el.homeTeamType}
                                                              awayTeamType={el.awayTeamType}
                                                              actionDelete = {this.handleClickDelete}
                                                              status = {el.status}
                                                    /> )
                                }
                            </tbody>
                        </table>
                    <h1 className="userTypes">Typy zamknięte:</h1>
                    <table className='userTypesTable'>
                        <thead>
                        <th>Data</th>
                        <th>Drużyny</th>
                        <th>Typowany wynik</th>
                        <th> Zdobyte punkty</th>
                        </thead>
                        <tbody>
                        {newRowClosed.length == 0 ?
                            <tr>
                                <td colSpan="4"> Brak wpisów</td>
                            </tr> :
                            newRowClosed.map(el => <UserTypesRow key={el.key}
                                                               id={el.key}
                                                               date={el.matchDate}
                                                               homeTeamName={el.homeTeamName}
                                                               awayTeamName={el.awayTeamName}
                                                               homeTeamType={el.homeTeamType}
                                                               awayTeamType={el.awayTeamType}
                                                               actionDelete={this.handleClickDelete}
                                                               points={el.points}
                                                               status={el.status}
                                                    />)
                        }
                        </tbody>
                        <tfoot>
                            <tr className="sumTR">
                                <td className="sumTD"   colSpan="3">RAZEM: </td>
                                <td className="typeTD">{newRowClosed.reduce( (prev, curr) => prev+curr.points, 0) }</td>
                            </tr>
                        </tfoot>
                    </table>
                    </div>
            </Template>
        )
    }

}

module.exports = UserTypes;