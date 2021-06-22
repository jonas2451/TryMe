import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import VideoPlayer from '../VideoPlayer';
import Footer from '../Footer'
import axios from "axios";
import CardItem from "../CardItem";
import {Button} from "../Button";
import LoadingSpinner from "../LoadingSpinner";
import Loader from "react-loader-spinner";

const backendURL = "http://localhost"
const imageAPIURL = "http://localhost:4000/"

class Home extends React.Component {

    state = {

    }

    componentDidMount() {

        // TODO Get all Categories that contain Women clothes
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'Token',
                "Access-Control-Allow-Origin": "*",
            }
        };
        let url = `${backendURL}:5000/products`
        axios.get(url, {}, axiosConfig)
            .then(res => {
                console.log(res)
                this.setState({
                    products: res.data,
                    loaded: true,
                    error: res.data[1]
                })
            })
            .catch(err => {
                this.setState({
                    error: err
                })
            })
    }

    render() {

        if (!this.state.loaded) {
            return (
                <div className={"content"}>
                    <LoadingSpinner style={{background: "transparent"}}>
                        <Loader
                            visible={this.props.loaded}
                            type="Oval"
                            color="#fff"
                            height={100}
                            width={100}
                            timeout={20000} //20 secs in case of a broken backend
                        />
                    </LoadingSpinner>
                </div>
            )
        } else {
            return (
                <>
                    <div className='cards'>
                        <div className="cards__container">
                            <div className="cards__wrapper">
                                <ul className="cards__items">
                                    <CardItem
                                        src={imageAPIURL + this.state.products[0][8]}
                                        text={this.state.products[0][1] + " - " + this.state.products[0][2]}
                                        label={this.state.products[0][3] + "€"}
                                        path={`/product?${this.state.products[0][0]}`}
                                    />
                                    <CardItem
                                        src={imageAPIURL + this.state.products[1][8]}
                                        text={this.state.products[1][1] + " - " + this.state.products[1][2]}
                                        label={this.state.products[1][3] + "€"}
                                        path={`/product?${this.state.products[1][0]}`}
                                    />
                                    <CardItem
                                        src={imageAPIURL + this.state.products[3][8]}
                                        text={this.state.products[3][1] + " - " + this.state.products[3][2]}
                                        label={this.state.products[3][3] + "€"}
                                        path={`/product?${this.state.products[3][0]}`}
                                    />
                                    <CardItem
                                        src={imageAPIURL + this.state.products[7][8]}
                                        text={this.state.products[7][1] + " - " + this.state.products[7][2]}
                                        label={this.state.products[7][3] + "€"}
                                        path={`/product?${this.state.products[7][0]}`}
                                    />
                                </ul>
                            </div>
                        </div>
                        <div className='cards__center_button'>
                            {<Button buttonStyle='btn--primary--cards'>Check the Collection</Button>}
                        </div>
                    </div>
                    <HeroSection/>
                    <VideoPlayer/>
                    <Footer/>
                </>
            )
        }
    }
}

export default Home;