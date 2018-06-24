import React from 'react';
import {Route, Link} from 'react-router-dom';
import Header from './Main/Header.jsx';
import Ads from './Main/Ads.jsx';
import Footer from './Main/Footer.jsx';

class Template extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mouseOver: false
        }
    }

    handleMouseEnter = () => {
        this.setState({
            mouseOver: true
        })
    }
    handleMouseOut = () => {
        this.setState({
            mouseOver: false
        })
    }

    render(){
        let tooltip;
        if (this.state.mouseOver && !localStorage.getItem('user') ) {
            tooltip = <span className="tooltipText">Musisz się zalogować</span>
        }
        return(
            <div className="box">
                <div className="mainHeight">
                    <Header/>
                    <div className="HolyGrail-body">
                        <nav className="HolyGrail-nav">
                            <ul className="menu">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/rules">Zasady gry</Link></li>
                                <li><Link to="/ranking">Ranking</Link></li>
                                <li><Link onMouseEnter={this.handleMouseEnter} onMouseOut={this.handleMouseOut} to="/typing">Typowanie wyników</Link></li>
                                <li><Link onMouseEnter={this.handleMouseEnter} onMouseOut={this.handleMouseOut} to="/userTypes">Historia typowania</Link> </li>
                                <li><Link to="/finished"> Historia rozgrywek</Link> </li>
                                {tooltip}
                            </ul>
                        </nav>
                        {this.props.children}
                        <Ads/>
                    </div>
                    <Footer/>
                </div>
            </div>

        )
    }
}

module.exports = Template;