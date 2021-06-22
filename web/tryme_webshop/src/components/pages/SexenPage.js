import React from 'react';
import '../../App.css';
import CardItem from '../CardItem'
import '../Cards.css'
import CategoryCard from '../CategoryCard'
import '../CategoryCards.css'
import './SexenPage.css'
import axios from 'axios'
import Footer from '../Footer'
import {Redirect} from 'react-router';
import LoadingSpinner from "../LoadingSpinner";
import Loader from "react-loader-spinner";


const backendURL = "http://localhost"
const imageAPIURL = "http://localhost:4000/"

class SexenPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {sexen: "sexen", categories: undefined, error: undefined, isLoaded: false}
    }

    componentDidMount() {
        //TODO Get all Categories that contain Women clothes
        if(this.state.sexen) {
            let axiosConfig = {
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                    'Accept': 'Token',
                    "Access-Control-Allow-Origin": "*",
                    'sexen' : this.state.sexen,
                }
            };
            let url = `${backendURL}:5000/categories`

            axios.post(url, {}, axiosConfig)
                .then(res => {
                    console.log(res)
                    this.setState({
                        categories: res.data.categories,
                        error: res.data[1],
                        isLoaded: true
                    })
                    console.log(this.state.categories)
                })
                .catch(err => {
                    this.setState({
                        error: err
                    })
                })
        } else {
            this.setState({loginRequired: true})
            localStorage.setItem("currentProduct", this.state.productId)
        }
    }

    Loaded(props) {
        const state = props.state
        state.sexen = props.sexen

        let img = 'null'
        if (state.sexen === 'women') {
            img = imageAPIURL+'test-image.jpg'
        } else if (state.sexen === 'men') {
            img = imageAPIURL+'pexel-image1.jpg'
        } else if (state.sexen === 'children') {
            img = imageAPIURL+'hoodie.jpg'
        }
        if (state.error) {
            return (<Redirect to="/error" />);
        } else
        if (state.isLoaded) {
            return(
                <>
                    <div>
                        <h1>Featured Categories</h1>
                    </div>
                    <div className='cards'>
                        <div className="cards__container">
                            <div className="cards__wrapper">
                                <ul className="cards__items">

                                    {
                                        // console.log(state.categories[0][0]),
                                        state.categories.map((index) => {
                                            // console.log(index)

                                            return React.createElement(
                                                CategoryCard,
                                                {src: imageAPIURL + index[3], text: index[1], path: `/browse?category=${index[0]}`}, // Props
                                            )
                                        })
                                    }

                                    {/*<CategoryCard*/}
                                    {/*    src='/assets/images/img-3.jpg'*/}
                                    {/*    text={categories[0]}*/}
                                    {/*    path='/product'*/}
                                    {/*/>*/}
                                    {/*<CategoryCard*/}
                                    {/*    src='/assets/images/img-4.jpg'*/}
                                    {/*    text={categories[1]}*/}
                                    {/*    path='/product'*/}
                                    {/*/>*/}
                                    {/*<CategoryCard*/}
                                    {/*    src='/assets/images/img-5.jpg'*/}
                                    {/*    text={categories[2]}*/}
                                    {/*    path='/product'*/}
                                    {/*/>*/}
                                    {/*<CategoryCard*/}
                                    {/*    src='/assets/images/img-6.jpg'*/}
                                    {/*    text={categories[3]}*/}
                                    {/*    path='/product'*/}
                                    {/*/>*/}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </>
            )
        } else {
            return(
                <div className={"content"}>
                    <LoadingSpinner style={{background: "transparent"}}>
                        <Loader
                            visible={state.idLoaded}
                            type="Oval"
                            color="#fff"
                            height={100}
                            width={100}
                            timeout={20000} //20 secs in case of a broken backend
                        />
                    </LoadingSpinner>
                </div>
            )
        }
    }

    render() {
        return (
            <this.Loaded state={this.state} sexen={this.props.sexen} isLoaded={this.state.isLoaded}/>
        )
    }
}



export default SexenPage