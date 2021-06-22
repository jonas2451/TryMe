import React from 'react'
import '../App.css'
import './HeroSection.css'

function HeroSection() {
    return(
        <>
            <div className='hero-container'>
                <img src='/assets/images/img-home.jpg' alt=''/>
            </div>
            <div className='hero-heading'>
                <h1>Summer 2021</h1>
            </div>
        </>
    )
}

export default HeroSection