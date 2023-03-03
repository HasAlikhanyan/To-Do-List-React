
import './buttonsGroup.css';

import { Component } from "react";

class ButtonsGroup extends Component {
    render () {
        return (
            <div>
                <button onClick={this.props.increaseProductAmount} className = "btn">Increase the amount</button> 
                <button onClick={this.props.decreaseProductAmount} className = "btn">Decrease the amount</button>    
            </div>   
        )
    }
}

export default ButtonsGroup;
