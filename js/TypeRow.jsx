import React from 'react';

class TypeRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            homeTeamGoal: "",
            awayTeamGoal: ""
        }
    }

    handleChangeHomeGoal = (e) => {

        if (e.target.value==Math.floor(e.target.value) && e.target.value>=0 ) {
            this.setState({
                homeTeamGoal: e.target.value
            })
        } else {
            e.target.value = null
            this.setState({
                homeTeamGoal: ""
            })
        }
    }

    handleChangeAwayGoal = (e) => {

        if (e.target.value==Math.floor(e.target.value) && e.target.value>=0 ) {
            this.setState({
                awayTeamGoal: e.target.value
            })
        } else {
            e.target.value = null
            this.setState({
                awayTeamGoal: ""
            })
        }
    }

    render(){
        return(
            <tr key={this.props.id} data-matchid = {this.props.id} className="typeRow"
                                                                data-matchdate={this.props.date}
                                                                data-hometeamname={this.props.homeTeamName}
                                                                data-awayteamname={this.props.awayTeamName}>
                <td> {this.props.date} </td>
                <td className="teams"> {this.props.homeTeamName} : {this.props.awayTeamName}</td>
                <td>  <input onChange = {this.handleChangeHomeGoal} className="inputType1" type="number" value = {this.state.homeTeamGoal}/> : <input onChange={this.handleChangeAwayGoal} className="inputType2" type="number" value={this.state.awayTeamGoal}/> </td>
            </tr>
        )
    }
}

module.exports = TypeRow;