import React, {Component} from 'react'
import "./ProductView.css"
import Loader from 'react-loader-spinner'
import LoadingSpinner from "./LoadingSpinner";
import "./Common.css"


class ProductImage extends Component {

    render() {
        if (this.props.loaded === false) {
            return (
                <div className={"content"}>
                    <LoadingSpinner style={{background: "transparent"}}>
                        <Loader
                            visible={true}
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
                <div className={"left"}>
                    <img alt={"Clothing Item"} style={{minWidth:"300px"}} src={this.props.path}/>
                </div>
            )
        }
    }
}

export default ProductImage;