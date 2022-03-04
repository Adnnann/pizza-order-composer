import '../../assets/styles/order.css'
import Container from "react-bootstrap/esm/Container"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row'
import { useDispatch, useSelector } from 'react-redux'
import {getOrder, 
        getQuantity,
        increaseQuantity,
        decreaseQuantity,
        setTotalPriceOfEachOrder
} from '../../features/pizzaSlice'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import AddNewAddress from "./AddNewAdress"
import UserAddresses from "./UserAdresses"
import OrderPrice from "./OrderPrice"
import QuantityButtons from './QuantityButtons'

const Order = () => {

    const quantity = useSelector(getQuantity)
    const dispatch = useDispatch()
    const order = useSelector(getOrder)

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

console.log(orderDetails)


return(
<Container >

        <Row style={{borderStyle:"solid", marginBottom:'10px'}}>
            <Col style={{borderBottomStyle:'solid'}}>
                <h1 >Address to deliver</h1>
            </Col> 
           
            <Row className="justify-content-center" 
            style={{paddingTop:'10px', paddingBottom:'10px'}}>
                {/*  Address panel */}
                <UserAddresses getDeliveryAddress={(e)=>getDeliveryAddress(e)}/>
                {/* enable user to add new address*/}
                <AddNewAddress />   
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
                        {/* Quantity Button */}
                           <QuantityButtons 
                           decreaseQ={()=>decreaseQ(index)} 
                           quantity={quantity[index]} 
                           increaseQ={()=>increaseQ(index)}
                           />
                        </Col>  
                        <hr/>  
                    </Row>  
                    ) 
                }) 
           } 
           {/* Order price and additional notes */}
          <OrderPrice orderNotes={orderNotes} />
        </Row>
    </Container>
    )
}
export default Order