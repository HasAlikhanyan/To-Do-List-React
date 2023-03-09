import { Component } from "react";

class Price extends Component {
    
    state = {
        price: this.props.price,
        currency: this.props.currency,
        amdExchangeRate: 390,
    }

    onChangeCurrency = () => {
        let {price, currency, amdExchangeRate} = this.state;
        if(currency === '$'){
            this.setState({
                price: price * amdExchangeRate,
                currency: 'AMD',
            })
        }
        else{
            this.setState({
                price: price / amdExchangeRate,
                currency: this.props.currency,
            })
        }      
    }

    render() {
        const {price, currency} = this.state;

        return (
            <>
                <span>{price*this.props.count}</span>
                <span>{currency}</span>
                <button onClick = {this.onChangeCurrency} className = 'btn'>Change the currency</button> <br /><br/>
            </>
        )
    }
}

export default Price;


