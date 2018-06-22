import React from 'react';
import Template from './Template.jsx';

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            event: []
        }
    }

    componentDidMount() {
        fetch('http://api.football-data.org/v1/competitions/467', { headers: {"X-Auth-Token": "1e265f892ce541f69195f6d45eedccc8" }  } )
            .then(results=>{
                return results.json();
            }).then(data => {
            let event = data.caption
            this.setState({
                event: event
            });
        });
    }

    render(){
        return(
            <Template>
                <div id="home" className="HolyGrail-content" >
                    <h3 className="home"> Aktualny turniej: </h3>
                    <h1 className="home"> {this.state.event} </h1>
                    <img src="../img/logo.png"/>
                </div>
            </Template>

        )
    }
}

module.exports = Home;