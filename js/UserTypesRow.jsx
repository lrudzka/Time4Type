import React from 'react';
import Auth from './Services/Auth';


class UserTypesRow extends React.Component{


    handleClick = (key) => {
        Auth.checkLogedIn();
        if ( typeof this.props.actionDelete === 'function') {
            console.log('clickw');
            this.props.actionDelete(this.props.id)
        }
    }


    render(){

        let view;

        if ( this.props.status==='open') {
            view = <button className="delete" onClick={this.handleClick} > X </button>
        } else if (this.props.status === 'in_play') {
            view = <span>mecz w trakcie</span>
        } else {
            view = this.props.points
        }

        return(

            <tr data-id={this.props.id}>
                <td> {this.props.date} </td>
                <td className="typeTD"> {this.props.homeTeamName} : {this.props.awayTeamName}</td>
                <td className="typeTD"> {this.props.homeTeamType} : {this.props.awayTeamType }</td>
                <td className="typeTD"> {view} </td>
            </tr>

        )
    }
}

module.exports = UserTypesRow;