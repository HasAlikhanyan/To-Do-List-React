
import { Component } from "react";

import Name from '../name/Name';
import Price from '../price/Price';
import Description from "../description/Description";
import ButtonsGroup from "../buttonsGroup/ButtonsGroup";


class Product extends Component {
    constructor (props) {
        super (props);
        this.state = {
            count: 1
        }
    }

    increaseProductAmount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    decreaseProductAmount = () => {
        if(this.state.count === 1) {
            return;
        }

        this.setState({
            count: this.state.count - 1
        })
    }

    render() {
        const {name, price, description} = this.props;
        return <div  className = "product">  
            Type of product - <Name name = {name}/> <br/> <br/>

            Description - <Description description = {description}/> <br/> <br/>

            Price of one product - <Price 
                price = {price} 
                currency = "$" 
                count= {1}
            />

            Total price - <Price 
                price = {price} 
                currency = "$" 
                count = {this.state.count}
            />

            Amount of product : {this.state.count} <br/> <br/>

            <ButtonsGroup 
                increaseProductAmount = {this.increaseProductAmount} 
                decreaseProductAmount = {this.decreaseProductAmount}
            />           
        </div>      
    }
}

export default Product;