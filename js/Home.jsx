import React from 'react';
import Template from './Template.jsx';
import FetchService from './Services/FetchService';

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            event: []
        }
    }

    componentDidMount() {
        FetchService.getFootballEventName( data => {
            this.setState({
                event: data.caption
            })
        })
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