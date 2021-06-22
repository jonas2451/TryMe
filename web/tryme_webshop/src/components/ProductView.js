import React, {Component} from 'react'
// import "./Button.css"
import "./ProductView.css"
import axios from "axios"
import {Redirect} from 'react-router';
import Loader from 'react-loader-spinner'
import LoadingSpinner from "./LoadingSpinner";
import "./Common.css"
import "./ProductImage"
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendURL = "http://localhost"
const imageAPIURL = "http://localhost:4000/"


class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("token"),
            error: false,
            // productId: this.props.productId,
            product: {}, img_path: "",
            loginRequired: false,
            loaded: false,
            tryOnImage: undefined,
            loadedTryOn: undefined
        };
        // this.tryOn = this.tryOn.bind(this)
    }

    componentDidMount() {

        let productId = undefined

        if (window.location.href.slice(-3).match("\\d+") != null) {
            productId = window.location.href.slice(-3).match("\\d+").toString()
            this.setState({productId: productId})
            console.log(productId)
        }


        let axiosConfig = {
            headers: {
                'Content-Type' : 'application/json; charset=UTF-8',
                'Accept': 'Token',
                "Access-Control-Allow-Origin": "*",
                'productId' : productId
            }
        };
        console.log(this.state.productId);
        if (productId) {
            try {
                // Get Product Image
                axios.post( `${backendURL}:5000/showProduct`,{}, axiosConfig)
                    .then(res =>
                        {
                            console.log(res.data);
                            this.setState(
                                {
                                    loggedIn: res.data.success,
                                    img_path: res.data.product_image[0][2],
                                    product: res.data.product,

                                },
                            );
                            console.log(imageAPIURL + this.state.img_path)
                        }
                    )
                    .then(() => {
                            // Get User Image
                            if (localStorage.getItem("token")) {
                                let axiosConfig2 = {
                                    headers: {
                                        'Content-Type': 'application/json; charset=UTF-8',
                                        'Accept': 'Token',
                                        "Access-Control-Allow-Origin": "*",
                                        'token': localStorage.getItem("token")
                                    }
                                }
                                axios.post(`${backendURL}:5000/getUserImage`, {}, axiosConfig2)
                                    .then(res => {
                                        console.log(res)
                                        if (res.data["success"] !== false) {
                                            this.setState({loaded: true, userImage: res.data})
                                        } else {
                                            this.setState({loaded: true})
                                        }
                                    })
                                    .catch(err => {
                                        console.log("Error getting user image:" + err)
                                        this.setState({error: true})
                                    })
                            } else {
                                this.setState({loaded: true})
                            }
                        }
                    )
                    .catch(err => {
                        console.log("!!!No connection...!!!")
                        this.setState({error: true})
                    })

            } catch (error) {
                console.log("!!!No connection...!!!")
                this.setState({error: true})
            }
        }
        console.log("Uff");

        // getUserImage


    }



    tryOn() {

        let token = localStorage.getItem("token")
        this.setState({loadedTryOn: false})

        if(token) {
            let axiosConfig = {
                headers: {
                    'Content-Type' : 'image/gif; charset=UTF-8',
                    'Accept': 'Token',
                    "Access-Control-Allow-Origin": "*",
                    'token' : token,
                    'image_path' : this.state.img_path
                }
            };
            let url = `${backendURL}:5000/tryOnProduct`

            axios.post(url, {}, axiosConfig).then(res => {
                // console.log(res)
                // console.log(typeof(res.data))
                // const utf8 = require('utf8');
                if (res.data["success"] === false) {
                    this.setState({loadedTryOn: true})
                    toast.dark(
                        "The TryOn Service is currently not available. Please Try again later or contact the support!",
                        {
                            position: "bottom-right",
                            autoClose: 10000,
                            draggable: true
                        }
                    )
                } else {
                    this.setState({tryOnImage: res.data, loadedTryOn: true})
                }
            })
        } else {
            this.setState({loginRequired: true})
            localStorage.setItem("currentProduct", this.state.productId)
        }
    }

    render() {
        // {this.state.productId = this.props.productId}
        if (this.state.error === true) {
            return (<Redirect to="/error" />);
        } else if (this.state.loginRequired) {
            return (<Redirect to="/sign-up" />);
        } else if (!this.state.loaded) {
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
        }
        else if (this.state.tryOnImage) {
            return (
                <div className={"container"} style={{flexDirection: "row"}}>
                    <ToastContainer/>
                    <ProductImage loaded={true} path={imageAPIURL + this.state.img_path}/>
                    <ProductDetails onClick={() => this.tryOn()} brand={this.state.product[1]} name={this.state.product[2]} price={this.state.product[3]} description={this.state.product[4]} />
                    <ProductImage loaded={true} path={ `data:image/gif;base64,${this.state.tryOnImage}` }/>
                </div>
            )
        }
        else if (this.state.userImage) {
            return (
                <div className={"container"} style={{flexDirection: "row"}}>
                    <ToastContainer/>
                    <ProductImage loaded={true} path={imageAPIURL + this.state.img_path}/>
                    <ProductDetails onClick={() => this.tryOn()} brand={this.state.product[1]} name={this.state.product[2]} price={this.state.product[3]} description={this.state.product[4]} />
                    <ProductImage loaded={this.state.loadedTryOn} path={ `data:image/gif;base64,${this.state.userImage}` }/>
                </div>
            )
        }
        else {
            return (
                <div className={"container"} style={{flexDirection: "row"}}>
                    <ToastContainer/>
                    <ProductImage loaded={true} path={imageAPIURL + this.state.img_path}/>
                    <ProductDetails onClick={() => this.tryOn()} brand={this.state.product[1]} name={this.state.product[2]} price={this.state.product[3]} description={this.state.product[4]} />
                    <div className={"left"}>
                        Try the TryOn Button! It will put you in the clothing item displayed on the left!<br/>
                        Login and upload in image of yourself to be able to use our digital try on!
                    </div>
                </div>
            )
        }
    }
}

export default ProductView;