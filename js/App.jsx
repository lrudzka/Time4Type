import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,
    Route,
    Link,
    Switch,
    NavLink  } from 'react-router-dom';
import Rules from './Rules.jsx';
import Typing from './Typing.jsx';
import Home from './Home.jsx';
import Finished from './Finished.jsx';
import UserTypes from './UserTypes.jsx';
import Ranking from './Ranking.jsx';
import '../css/style.scss';




class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                userLogedIn: false,
                userTokenId: localStorage.getItem('tokenId')
        }
    }

    render(){

        return(
            <HashRouter>
                <section>
                    <Route exact path ='/' component={Home}  />
                    <Route path="/rules" component={Rules} />
                    <Route path="/typing" component = {Typing}/>
                    <Route path="/finished" component = {Finished} />
                    <Route path="/userTypes" component = {UserTypes}/>
                    <Route path="/ranking" component = {Ranking}/>
                </section>
            </HashRouter>

        )
    }
}

document.addEventListener('DOMContentLoaded', function() {



    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    )
})