import React from 'react';

class Footer extends React.Component{

    render(){
        return(
            <div className="footer">
                <div className="footerBox">
                    <span id='cookies'>Strona korzysta z plików cookie. Możesz określić warunki przechowywania lub dostępu do cookie w Twojej przeglądarce.</span>
                    <div id='signingBox'>created by:  <span className="author">Lucyna Rudzka</span></div>
                </div>
            </div>
        )
    }
}

module.exports = Footer;