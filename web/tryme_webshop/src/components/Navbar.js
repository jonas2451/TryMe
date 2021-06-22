import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {Button} from "./Button";
import './Navbar.css'
import {BiUser} from 'react-icons/bi';

function Navbar(props) {
    const[click, setClick] = useState(false);
    const[button, setButton] = useState(true);


    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return(
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        TryMe <i className='fab fa-typo3'/>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/women' className='nav-links' onClick={closeMobileMenu}>Women</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/men' className='nav-links' onClick={closeMobileMenu}>Men</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/browse' className='nav-links' onClick={closeMobileMenu}>Children</Link>
                        </li>
                         <li className='nav-item'>
                            <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>Sign Up</Link>
                        </li>
                    </ul>
                    {props.token ?
                        button && <Button linkTo={"user"} buttonStyle='btn--outline'><BiUser /></Button> : button && <Button linkTo={"sign-up"} buttonStyle='btn--outline'>SIGN UP</Button> }
                </div>
            </nav>
        </>
    )
}

export default Navbar