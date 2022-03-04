
import Container from "react-bootstrap/esm/Container"
import '../assets/styles/order.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/esm/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { useDispatch, useSelector } from 'react-redux'
import {getOrder, 
        getQuantity,
        increaseQuantity,
        decreaseQuantity,
        setTotalPriceOfEachOrder,
        getSumOfAllOrders
} from '../features/pizzaSlice'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Order = () => {

    const navigate = useNavigate()
    const quantity = useSelector(getQuantity)
    const dispatch = useDispatch()
    const order = useSelector(getOrder)
    const sumOfAllOrders = useSelector(getSumOfAllOrders)

   
    //dummy array - REMOVE AFTER ADDING ADDRESS TO USER PROFILE.
    //GET DATA FROM STORE
    const address = [
        {address:'Maglajska 1', floor:'5 sprat'},
        {address:'Maglajska 1', floor:'3 sprat'},
        {address:'Maglajska 1', floor:'3 sprat'}
    ]

    const [orderDetails, setOrderDetails] = useState({
        address:'',
        floor:'',
        paymentUponDelivery:false,
        notes:''
    })
    
    //increase quantity and get update sum
    const increaseQ = (index) => {
        dispatch(increaseQuantity(index))
        dispatch(setTotalPriceOfEachOrder(index))
    }

    //increase quantity and get update sum
    const decreaseQ = (index) => {
        dispatch(decreaseQuantity(index))
        dispatch(setTotalPriceOfEachOrder(index))
    }
//get delivery address and ensure that user
//is able to change address
const getDeliveryAddress = event => {
    setOrderDetails({
        ...orderDetails,
        //as address and floor are part of one string, split
        //and get required values using indices
        address:event.target.value.split(' ')[0],
        floor:event.target.value.split(' ')[1] 
        + ' ' + event.target.value.split(' ')[2]
    }) 
}
//get payment type - default is false for payment upon delivery
const paymentType = () => {
    setOrderDetails({
        ...orderDetails,
        paymentUponDelivery: 
        orderDetails.paymentUponDelivery ? false : true
    })
}

const orderNotes = (event) => {
    setOrderDetails({
        ...orderDetails,
        notes: event.target.value

    })
}

console.log(orderDetails)

const placeholder = [<p>Any <strong>additional</strong> comment</p>]

return(
<Container >

        <Row style={{borderStyle:"solid", marginBottom:'10px'}}>
            <Col style={{borderBottomStyle:'solid'}}>
                <h1 >Address to deliver</h1>
            </Col> 
            {/* 
            ADDRESS
             */}
            <Row className="justify-content-center" 
            style={{paddingTop:'10px', paddingBottom:'10px'}}>
                {
                    address.map((item, index)=>{
                        return(
                        <Col 
                        style={{borderStyle:'solid', 
                        //set height to fixed value to avoid Add new address 
                        marginLeft:'10px', marginBottom:'10px', height:'100px'}}
                        xs={5} md={3} lg={3} xl={3}
                        key={index}>
                            <Form.Check 
                                type='radio'
                                id='default-radio'
                                name='address'
                                value={item.address !== '' && item.floor !== '' ?
                                    item.address + item.floor : ''}
                                label={item.address + `\n` + item.floor}
                                //enable showing label in two lines
                                style={{whiteSpace:'pre-wrap'}}
                                onChange={(e)=>getDeliveryAddress(e)}
                                readOnly
                                />
                                
                        </Col>
                        )
                    })
                    
                }
                {/* 
                enable user to add new address
                 */}
                <Col onClick={()=>alert('clicked')}
                style={{borderStyle:'solid', opacity:'0.2', backgroundColor:'grey', borderColor:'black', height:'100px', padding:'0px', color:'black', marginLeft:'10px', textAlign:'center'}}
                xs={5} md={3} lg={3} xl={3}>
                    <h1 style={{marginTop:'10px', fontSize:"50px"}}>+</h1>
                </Col>
                 
            </Row>
        </Row>
        

       <Row 
        className="justify-content-center"
        xs={12} 
        md={{span:10}} 
        lg={{span:10}}  
        xl={{span:10}}  
        style={{borderStyle:"solid",
        borderBottomStyle:'solid',
        paddingLeft:'2%',
        paddingRight:'2%'}}>

        <Col style={{borderBottomStyle:'solid'}}>
        
                <h1 style={{display:'inline-flex'}}>Payment</h1>
                {/* 
                enable user to select how she or he prefers to make
                make payment - default for payment upon deliver is false
                 */}
               <span> <Form.Check 
                style={{display:'inline-flex', marginLeft:"20px", paddingLeft:'20px'}}
                    type='radio'
                    id='default-radio'
                    name='paymentType'
                    onClick={paymentType}
                    checked={
                        orderDetails.paymentUponDelivery ?
                        orderDetails.paymentUponDelivery : false}
                    readOnly
                    />
                    <p style={{display:'inline', marginLeft:"5px"}}>upon deliver</p>
            </span>
            
        </Col>
        <Col xs={12} md={12} lg={12} xl={12} style={{marginTop:'20px'}}>
            <h1>Order</h1>
        </Col>

        
       {order.map((item, index)=>{
                return(
                    <Row style={{marginBottom:'10px'}} key={index}>

                        <Col xs={7} md={7} lg={7} xl={7}>
                            <h4>{item.donut.map(item=>item.name)}</h4>
                        </Col> 
        
                        <Col xs={2} md={2} lg={2} xl={2} >
                            <p style={{fontSize:'16px'}}>{`${item.price*quantity[index]}$`}</p>
                        </Col> 

                        <Col xs={3} md={3} lg={3} xl={3}  >
                            <ButtonGroup  >
                                <Button style={{fontSize:"10px", padding:'7px'}} 
                                 onClick={()=>decreaseQ(index)}>-</Button> 
                                <InputGroup.Text >{quantity[index]}</InputGroup.Text>
                                <Button style={{fontSize:"10px", padding:'7px'}} 
                                onClick={()=>increaseQ(index)}>+</Button>
                            </ButtonGroup>
                        </Col>  
                        <hr/>
                        
                        
                    </Row>  
                    ) 
                }) 


           } 
   
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
            <Col xs={1} md={1} lg={1} xl={1}>
                <p style={{textAlign:'left'}}>Notes:</p>
            </Col>

            <Col xs={11} md={11} lg={11} xl={11} style={{color:'black'}}>
                <Form.Control as='textarea' 
                placeholder='Any additional notes'
                onChange={orderNotes}
                />
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
           
        </Row>
    </Container>
    )
}
export default Order