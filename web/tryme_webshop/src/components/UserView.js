import React, {Component} from 'react'
import "./Button.css"
import "../App.css"
import "./LoginView.css"
import "./Common.css"
import {Redirect} from 'react-router';
import {Button} from "./Button";
import {FaUserAltSlash} from 'react-icons/fa';
import ImageUpload from './ImageUpload'

class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {token: localStorage.getItem("token")};
    }


    render() {
        if (!this.state.token) {
            return (<Redirect to="/error" />);
        } else

            return (
                <>
                    <div className={"centered_container"}>
                        <ImageUpload/>
                    </div>
                    <div className={"centered_container"}>
                        <input type="number" onChange={this.props.productHandler} /><br/>
                    </div>
                    <div className={"centered_container"}>
                        {<Button linkTo={"/"} onClick={this.props.logoutHandler} buttonStyle='btn--inverted'><FaUserAltSlash /></Button>}
                    </div>
                </>
            );
    }
}

export default UserView;