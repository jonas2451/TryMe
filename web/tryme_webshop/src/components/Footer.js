import React from 'react'

function Footer() {
    return(
        <footer>
            {/*<div className='footer-container'>*/}
            <div className={"footer-item"}>
                <a id={"a-footer"} href={"https://instagram.com"}>
                    <i className='fab fa-instagram' id='footer-item'/>
                    {/*<p className={"invisible"}>t</p>*/}
                </a>
            </div>
            <div className={"footer-item"}>
                <a id={"a-footer"} href={"https.twitter.com"}>
                    <i className='fab fa-twitter' id='footer-item'/>
                    {/*<p className={"invisible"}>t</p>*/}
                </a>
            </div>
            <div style={{}} className={"footer-item"}>
                <a title={"Facebook"} id={"a-footer"} href={"https://facebook"}>
                    <i className='fab fa-facebook' id='footer-item'/>
                    {/*<p className={"tiny-impressum"}>Data Protection</p>*/}
                </a>
            </div>
            {/*<div className={"footer-item"}>*/}
            {/*    <a title={"Impressum"} id={"a-footer"} href={"https://server.mehrhall.de:4848/contact.html"}>*/}
            {/*        <i className='fas fa-balance-scale' id='footer-item'/>*/}
            {/*        /!*<p className={"tiny-impressum"}>Impressum</p>*!/*/}
            {/*    </a>*/}
            {/*</div>*/}
            {/*</div>*/}
        </footer>
    )
}

export default Footer