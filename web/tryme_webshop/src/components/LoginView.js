import React, {Component} from 'react'
import "./Button.css"
import "../App.css"
import "./LoginView.css"
import axios from "axios"
import "./Common.css"
import {Redirect} from 'react-router';

const backendURL = "http://localhost"

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {connectionError: false, token: localStorage.getItem("token")};
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleLogin(){
        let axiosConfig = {
            headers: {
                'Content-Type' : 'application/json; charset=UTF-8',
                'Accept': 'Token',
                "Access-Control-Allow-Origin": "*",
                'email' : this.state.email,
                'password' : this.state.password
            }
        };
        console.log(this.state.email);
        console.log(this.state.password);
        if (this.state.email && this.state.password) {
            try {
                axios.post(backendURL+"/login",{}, axiosConfig)
                    .then(res =>
                        {
                            if (res.data.success === true) {
                                this.setState({
                                    dump: res,
                                    loggedIn: res.data.success,
                                    token: res.data.token,
                                    loginError: ""
                                })
                                this.props.loginHandler(res.data.token)
                            } else {
                                this.setState({
                                    loginError: res.data.error
                                })
                            }
                            console.log(res.data);
                            localStorage.setItem("token", res.data.token);
                            console.log(localStorage.getItem("token"))
                            // this.setState(
                            //     {
                            //         img: path,
                            //     },
                            // )
                        }
                    )
                    .catch(err => {
                        console.log("!!!No connection...!!!")
                        this.setState({connectionError: true})
                    })
            } catch (error) {
                console.log("!!!No connection...!!!")
                this.setState({connectionError: true})
            }
        } else {
            this.setState({loginError: "Please provide Username and Password!"})
        }
        console.log("Logged In");
    }

    componentDidMount() {

    }


    handleChangeEmail(input){
        this.setState({email:input.target.value})
    }

    handleChangePassword(input){
        this.setState({password:input.target.value})
    }

    render() {
        if (this.state.connectionError === true) {
            return (<Redirect to="/error" />);
        } else if (this.state.token) {
            return (<Redirect to="/" />);
        } else

        return (
            <div className={"centered_container"}>
                <div className={"login"}>
                    <h2>I ALREADY HAVE AN ACCOUNT</h2>
                    E-mail:{this.state.token}<br/>
                    <div className={"center"}>
                        <input type="email" value={this.state.email} onChange={this.handleChangeEmail} /><br/>
                    </div>
                    Password:<br/>
                    <div className={"center"}>
                        <input type="password" value={this.state.password} onChange={this.handleChangePassword} /><br/>
                    </div>
                    <div className={"error"}>
                        {this.state.loginError}
                    </div>
                    <div className={"center"}>
                        <button onClick={() => {this.handleLogin()}} value="Submit"> Login</button>
                    </div>
                </div>
                <hr style={{margin: "5px"}}/>
                <div className={"register"}>
                    <h2>I don't have an account</h2>
                    Enjoy the benefits of our virtual fitting room by creating an account!
                    <div className={"center"}>
                        <button>Create Account</button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default LoginView;