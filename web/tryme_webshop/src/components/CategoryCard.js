import React from 'react';
import {Link} from 'react-router-dom';

function CategoryCard(props) {
    // onclick( (category = props.category) => {
    //         const globalHelper = require('./Singleton/GlobalHelper');
    //         globalHelper.state = {category: props.category}
    //         console.log("PETER ENIS")
    //         console.log(props.category)
    //     }
    // )

    return(
        <>
            <li className="category_cards__item">
                <Link className='category_cards__item__link' to={{pathname: props.path}}>
                    <figure className='category_cards__item__pic-wrap'>
                        <img src={props.src} alt='' className='category_cards__item__img'/>
                    </figure>
                    <div className="category_cards__item__info">
                        <h5 className='category_cards__item__text'>{props.text}</h5>
                    </div>
                </Link>
            </li>
        </>
    )
}

export default CategoryCard