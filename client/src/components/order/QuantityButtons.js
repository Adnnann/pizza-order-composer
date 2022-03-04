import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/esm/Button'
import InputGroup from 'react-bootstrap/InputGroup'
const QuantityButtons = ({decreaseQ, quantity, increaseQ}) => {
    return(
        <ButtonGroup>
            <Button style={{fontSize:"10px", padding:'7px'}} 
                onClick={decreaseQ}>-</Button> 
            <InputGroup.Text >{quantity}</InputGroup.Text>
            <Button style={{fontSize:"10px", padding:'7px'}} 
            onClick={increaseQ}>+</Button>
        </ButtonGroup>
    )
}

export default QuantityButtons