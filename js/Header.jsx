import React from 'react';
import GoogleLogin from 'react-google-login';
import GoogleLogout from 'react-google-login';

class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            user: localStorage.getItem('user'),
            tokenId: localStorage.getItem('tokenId'),
            userData: []
        }
    }


    signIn = (response) => {
        localStorage.setItem("user", response.profileObj.givenName)
        localStorage.setItem('userEmail', response.profileObj.email)
        localStorage.setItem("tokenId", response.tokenId)
        localStorage.setItem("familyName", response.profileObj.familyName)
        localStorage.setItem("imageUrl", response.profileObj.imageUrl)

        this.setState({
            user: localStorage.getItem('user'),
            tokenId: localStorage.getItem('tokenId')
        })

    }

    logout = (response) => {
        console.log('użytkownik wylogowany', response);
        let GoogleAuth = gapi.auth2.getAuthInstance();
        GoogleAuth.signOut().then(function () {
            console.log('User signed out.');
        });
        this.setState({
            user: null,
            tokenId: null,
        })
        console.log('clear storage');
        localStorage.clear('tokenId');
        localStorage.clear('user');
        localStorage.clear('userEmail');
        localStorage.clear('familyName');
        localStorage.clear('imageUrl');

        //  GoogleAuth.disconnect();
    }

    logoutError = (response) => {
        console.log(response);
    }

    checkLogedIn = () => {
        let GoogleAuth = gapi.auth2.getAuthInstance();
        console.log('sign in ' +GoogleAuth.isSignedIn.Ab);
        console.log(this.state.user)
        if( !GoogleAuth.isSignedIn.Ab && this.state.user ){
            localStorage.clear('tokenId');
            localStorage.clear('user');
            localStorage.clear('userEmail');
            localStorage.clear('familyName');
            localStorage.clear('imageUrl');
            this.setState({
                user: null,
                tokenId: null
            })
        }
    }

    componentDidUpdate = () => {
        this.checkLogedIn();
    }

    render(){


        let hello = null
        let imgHello = null

        if (this.state.user) {
            hello = <span className="hello">Witaj, {this.state.user}</span>
            imgHello = <img className="ball" src='../img/ball.jpg'/>
        }

        // console.log(this.state.tokenId);
        let view =  <GoogleLogin
            clientId="407921894638-7ik18k5rsi1mhqll30ga55deo2ase283.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.signIn}
            onFailure={this.logout}
        >
            <span> Zaloguj się przez Google</span>
        </GoogleLogin>;

        if(this.state.tokenId){
            view =  <GoogleLogout
                buttresponseLogoutonText="Logout"
                onSuccess={this.logout}
                onFailure={this.responseLogoutError}
            >
                <span> Wyloguj się </span>
            </GoogleLogout>
        }

        return(
            <section className='header'>
                <div className="loginBox loginBoxBig">
                    <img className="ball" src='../img/ball.jpg'/>
                    <span className="apiName">TIME4TYPE</span>
                    <img className="ball" src='../img/ball.jpg'/>
                    {hello}
                    {view}
                    <img className="ball" src='../img/ball.jpg'/>
                </div>
                <div className="loginBox loginBoxSmall">
                    <span className="apiName">T4T</span>
                    <img className="ball" src='../img/ball.jpg'/>
                    {hello}
                    {imgHello}
                    {view}
                </div>
            </section>
        )
    }

}

module.exports = Header;