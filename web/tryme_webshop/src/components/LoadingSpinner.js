import React, {Component} from 'react'

export default class LoadingSpinner extends Component {
    render() {
        return (
            <div className="loader">
                <p>{this.props.message}</p>
                {this.props.children}
            </div>
        )
    }
}