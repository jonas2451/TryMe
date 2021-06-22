import React from 'react';
import '../../App.css';
import CardItem from '../CardItem'
import '../Cards.css'
import '../CategoryCards.css'
import './SexenPage.css'
import axios from 'axios'
import Footer from '../Footer'
import LoadingSpinner from "../LoadingSpinner";
import Loader from "react-loader-spinner";


const backendURL = "http://localhost"
const imageAPIURL = "http://localhost:4000/"

class ProductSelection extends React.Component {

    state = {
        sexen: "sexen",
        error: undefined
    }

    componentDidMount() {

        let id = undefined

        if (window.location.href.slice(-2).match("\\d+") != null) {
            id = window.location.href.slice(-2).match("\\d+").toString()
            this.setState({category: id})
        }

        // TODO Get all Categories that contain Women clothes
        if(id) {
            let axiosConfig = {
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                    'Accept': 'Token',
                    "Access-Control-Allow-Origin": "*",
                    'categoryId' : id,
                }
            };
            let url = `${backendURL}:5000/getProductsFromCategory`

            axios.post(url, {}, axiosConfig)
                .then(res => {
                    console.log(res)
                    this.setState({
                        products: res.data['products'],
                        loaded: true,
                        error: res.data[1]
                    })
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

    render(props) {
        console.log(this.state)
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
                        <div className='new_arrivals'>
                            <h1>New arrivals</h1>
                        </div>
                        <div className='cards'>
                            <div className="cards__container">
                                <div className="cards__wrapper">
                                    <ul className="cards__items">
                                        {
                                            // console.log(state.categories[0][0]),
                                            this.state.products.map((index) => {
                                                console.log("index...")
                                                console.log(index)

                                                return React.createElement(
                                                    CardItem,
                                                    {
                                                        src: imageAPIURL + index[8],
                                                        text: `${index[1]} - ${index[2]}`,
                                                        path: `/product?item=${index[0]}`,
                                                        label: index[3]+"€"
                                                    }, // Props
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </>
                )
            }
    }
}

export default ProductSelection