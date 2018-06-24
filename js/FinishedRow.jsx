import React from 'react';


class FinishedRow extends React.Component {


    render(){
        let view;

        if (this.props.status == 'IN_PLAY') {
            view = <span>(mecz w trakcie)</span>
        }



        return(
            <tr>
                <td> {this.props.date.slice(0,10)} </td>
                <td className="typeTD"> {this.props.homeTeamName} : {this.props.awayTeamName}</td>
                <td className="typeTD"> {this.props.goalsHomeTeam} : {this.props.goalsAwayTeam} {view} </td>
            </tr>)

    }
}


module.exports = FinishedRow;