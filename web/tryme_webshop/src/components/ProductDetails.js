import React, {Component} from 'react'
import "./ProductView.css"
import "./Common.css"


class ProductDetails extends Component {

    render() {
        return(
            <div className={"right"}>
                {this.props.brand}&nbsp;
                {this.props.name} <br/>
                <div className={"price"}>
                    {this.props.price}€
                </div>
                {this.props.description}
                {/*<button className={"product-button"}>*/}
                {/*Choose Size*/}
                {/*</button>*/}
                {/*<div style={{textAlign: "center", maxWidth: "40%", padding: "2%"}}>*/}
                {/*    or*/}
                {/*</div>*/}
                <button style={{marginTop:"20%"}} className={"product-button"} onClick={this.props.onClick}>
                    Try me!
                </button>
            </div>
        )
    }
}

export default ProductDetails;