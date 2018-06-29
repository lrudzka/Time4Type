import React from 'react';
import {Route, Link} from 'react-router-dom';
import Header from './Main/Header.jsx';
import Ads from './Main/Ads.jsx';
import Footer from './Main/Footer.jsx';

class Template extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mouseOver: false,
            mobileMenu: "hide"
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

    handleClick = () => {
        if (this.state.mobileMenu=="hide") {
            this.setState({
                mobileMenu: "show"
            })
        } else {
            this.setState({
                mobileMenu: "hide"
            })
        }


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
                        <nav className="HolyGrail-nav" >
                            <ul className="menu">
                                <p className="hamburgerMenu" onClick={this.handleClick}>Menu</p>
                                <li onClick={this.handleClick} className={this.state.mobileMenu}><Link to="/">Home</Link></li>
                                <li onClick={this.handleClick} className={this.state.mobileMenu}><Link to="/rules">Zasady gry</Link></li>
                                <li onClick={this.handleClick} className={this.state.mobileMenu}><Link to="/ranking">Ranking</Link></li>
                                <li onClick={this.handleClick} className={this.state.mobileMenu}><Link onMouseEnter={this.handleMouseEnter} onMouseOut={this.handleMouseOut} to="/typing">Typowanie wyników</Link></li>
                                <li onClick={this.handleClick} className={this.state.mobileMenu}><Link onMouseEnter={this.handleMouseEnter} onMouseOut={this.handleMouseOut} to="/userTypes">Historia typowania</Link> </li>
                                <li onClick={this.handleClick} className={this.state.mobileMenu}><Link to="/finished"> Historia rozgrywek</Link> </li>
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