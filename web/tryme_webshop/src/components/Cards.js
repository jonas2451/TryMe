import React from 'react';
import CardItem from './CardItem'
import './Cards.css'
import {Button} from './Button'

function Cards() {
    return(
        <div className='cards'>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                            src='/assets/images/img-9.jpg'
                            text='Test test test'
                            label='Test'
                            path='/product'
                        />
                        <CardItem
                            src="/assets/images/img-2.jpg"
                            text='Test No 2'
                            label='Bidde'
                            path='/men'
                        />
                        <CardItem
                            src='/assets/images/img-9.jpg'
                            text='Test test test'
                            label='Test'
                            path='/women'
                        />
                        <CardItem
                            src="/assets/images/img-2.jpg"
                            text='Test No 2'
                            label='Bidde'
                            path='/men'
                        />
                    </ul>
                </div>
            </div>
            <div className='cards__center_button'>
                {<Button buttonStyle='btn--primary--cards'>Check the Collection</Button>}
            </div>
        </div>
    )
}

export default Cards