import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/esm/Button'
import { useSelector } from 'react-redux'
import {getSumOfAllOrders} from '../../features/pizzaSlice'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
const OrderPrice = ({orderNotes}) => {

    const sumOfAllOrders = useSelector(getSumOfAllOrders)
    const navigate = useNavigate()

    return(
        <>
        <Col xs={7} md={7} lg={7} xl={7}>
        <p>Delivery</p>
        </Col> 
    
        <Col xs={5} md={5} lg={5} xl={5} >
            <p style={{fontSize:'16px'}}>5$</p>
        </Col> 
                    
        <Col xs={7} md={7} lg={7} xl={7} style={{borderTopStyle:"solid", borderTopWidth:"4px"}}>
            <p style={{fontWeight:'bold', display:'inline'}}>TOTAL:</p>
        </Col>

        <Col xs={5} md={5} lg={5} xl={5} style={{borderTopStyle:"solid", borderTopWidth:"4px"}}>
            <p style={{fontWeight:'bold', display:'inline'}}>{
            Object.keys(sumOfAllOrders).length !== 0 ? 
            ` ${Object.values(sumOfAllOrders).reduce((prev,curr)=>prev+curr) + 5}$`
            : 0}</p>
        </Col> 

        <Row style={{marginTop:'20px', marginBottom:'20px'}}>
            <Col xs={2} md={1} lg={1} xl={1}>
                <p style={{textAlign:'left'}}>Notes:</p>
            </Col>

            <Col xs={10} md={11} lg={11} xl={11} style={{color:'black'}}>
                <Form.Control as='textarea' 
                placeholder='Any additional notes'
                onChange={orderNotes}/>
            </Col>
        
        </Row>

        <Row className="justify-content-center">
            <Col 
            xs={12} 
            md={{span:4, offset:3}} 
            lg={{span:4, offset:3}} 
            xl={{span:4, offset:3}} 
            style={{marginBottom:"20px"}}>
    
                <Button style={{marginBottom:'10px', minWidth:"180px", margin:"0 auto"}} 
                onClick={()=>navigate('/order')}>ORDER</Button>
            </Col>
    
        </Row>   
    </>
    )
}

export default OrderPrice