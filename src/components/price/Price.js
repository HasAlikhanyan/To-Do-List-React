import { Component } from "react";

class Price extends Component {
    render() {
        return (
            <span>{this.props.price}</span>
        )
    }
}

export default Price;