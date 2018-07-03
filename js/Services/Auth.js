// const google = require('googleapis');

class Auth{


    static checkLogedIn() {

        if(!localStorage.getItem('tokenId')){
            window.location.replace('/');
        }

    }


}

module.exports = Auth;