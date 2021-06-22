import React, {Component} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './components/pages/Home';
import LoginView from "./components/LoginView";
import ProductView from "./components/ProductView";
import SexenPage from './components/pages/SexenPage';
import Error from "./components/Error";
import UserView from "./components/UserView";
import ProductSelection from "./components/pages/ProductSelection";

export default class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            productId: 123,
            error: false,
            token: localStorage.getItem("token"),
            category: ""
        };
        this.logoutHandler = this.logoutHandler.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
        this.productHandler = this.productHandler.bind(this)
    }

    productHandler(id){
        console.log("Dieter")
        this.setState({productId: id.target.value})
    }

    loginHandler(token){
        console.log("<login handler in APP>")
        console.log("token received: " + token)
        if (token) {
            this.setState({token: token})
        }
    }

    logoutHandler(){
        localStorage.removeItem("token")
        this.setState({token: undefined})
    }


    render() {
        console.log(this.state.token)
        return (
            <>
                <Router>
                    <Navbar token={this.state.token}/>
                    <Route path='/' exact component={Home}/>
                    <Route exact path={"/sign-up"} component={LoginView}>
                        <React.Fragment>
                            <LoginView loginHandler={this.loginHandler}/>
                        </React.Fragment>
                    </Route>
                    <Route exact path={"/error"} component={Error}>
                        <React.Fragment>
                            <Error/>
                        </React.Fragment>
                    </Route>
                    <Route exact path={"/product:productId"} component={ProductView}>
                        <React.Fragment>
                            <ProductView productId={this.state.productId}/>
                        </React.Fragment>
                    </Route>
                    <Route exact path={"/women"} component={SexenPage}>
                        <React.Fragment>
                            <SexenPage sexen="women" />
                        </React.Fragment>
                    </Route>
                    <Route exact path={"/men"} component={SexenPage}>
                        <React.Fragment>
                            <SexenPage sexen="men" />
                        </React.Fragment>
                    </Route>
                    <Route exact path={"/children"} component={SexenPage}>
                        <React.Fragment>
                            <SexenPage sexen="children" />
                        </React.Fragment>
                    </Route>
                    <Route exact path={"/user"} component={UserView}>
                        <React.Fragment>
                            <UserView productHandler={this.productHandler} logoutHandler={this.logoutHandler}/>
                        </React.Fragment>
                    </Route>
                    <Route exact path={"/browse:category"} component={ProductSelection}>
                        <React.Fragment>
                            <ProductSelection />
                        </React.Fragment>
                    </Route>
                </Router>
            </>
        );
    }
}