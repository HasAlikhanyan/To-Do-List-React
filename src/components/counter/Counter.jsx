
import { Button } from "react-bootstrap";

import { useEffect, useState } from "react";

function Counter () {
    const [counterValue, setCounterValue] = useState(0);
    const [counterStatus, setCounterStatus] = useState("Zero");

    function onChangeCounterValue (i) {
        setCounterValue(counterValue + i);
    }

    useEffect(()=>{
        if(counterValue > 0) {
            setCounterStatus("Positive");
        }
        else if(counterValue < 0) {
            setCounterStatus("Negative");
        }
        else {
            setCounterStatus("Zero");
        }
    }, [counterValue]);

    
    return (
        <>
            <Button 
                className="btn-secondary m-4"
                onClick={()=> onChangeCounterValue(-1)}
            >
                Decrease Counter
            </Button>
            <span> {counterValue} </span>
            <Button 
                className="btn-secondary m-4"
                onClick={()=> onChangeCounterValue(1)}
            >
                Increase Counter
            </Button>    
            <p className="mb-5"> {counterStatus} </p>
        </>
    )
}

export default Counter;