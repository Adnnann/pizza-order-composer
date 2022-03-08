import '../../assets/styles/order.css'
import Container from "react-bootstrap/esm/Container"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getOrder, 
        getQuantity,
        increaseQuantity,
        decreaseQuantity,
        setTotalPriceOfEachOrder,
        getUserSigninData,
        readUserData,
        getSumOfAllOrders,
        createOrder,
        getUserToken,
        getPlacedOrder,
        setOrderWindowModal,
        clearOrder,
        userToken,
        resetStore
} from '../../features/pizzaSlice'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import AddNewAddress from "./AddNewAdress"
import RemoveUserAddress from "./RemoveUserAddress"
import SendOrder from "./SendOrder"
import QuantityButtons from './QuantityButtons'
import { useNavigate } from 'react-router-dom'


const Order = () => {
    const quantity = useSelector(getQuantity)
    const dispatch = useDispatch()
    const order = useSelector(getOrder)
    const userData = useSelector(getUserSigninData)
    const sumOfAllOrders = useSelector(getSumOfAllOrders)
    const navigate = useNavigate()
    const placeOrder = useSelector(getPlacedOrder)
    const token = useSelector(getUserToken)
 
    useEffect(()=>{

        dispatch(userToken())
        //In case user tried to visit url /protected without token, redirect 
        //to signin page
        if(token === 'Request failed with status code 500' 
            || token ==='Request failed with status code 401'){
            dispatch(resetStore())
            navigate('/')
        }

        if(token.hasOwnProperty('message')){
            if(Object.keys(order).length === 0){
                navigate('/addToCart')
            }
    
            if(placeOrder.hasOwnProperty('message')){
                dispatch(clearOrder())
                dispatch(setOrderWindowModal(true))
            }
    
            dispatch(readUserData(userData.user._id))

        }
    
    },[userData, Object.keys(order).length, placeOrder, token.message])

    const [orderDetails, setOrderDetails] = useState({
        address:'',
        floor:'',
        paymentUponDelivery:false,
        notes:'',
        error:''
    })

    //increase quantity and update total sum
    const increaseQ = (index) => {
        dispatch(increaseQuantity(index))
        dispatch(setTotalPriceOfEachOrder(index))
        setOrderDetails({
            ...orderDetails,
            quantity:[quantity.map(item=>item)],
            price: Object.values(sumOfAllOrders).reduce((prev,curr)=>prev+curr)
        })
    }
    const orderDough = () => {

        if(orderDetails.address === '' || orderDetails.floor === ''){
            setOrderDetails({...orderDetails, error:'You must add address before placing order'})
            window.scroll(0, 0)
            return
        }

        const orderToSend = {
            userId:userData.user._id,
            deliveryAddress:[{address:orderDetails.address, floor:orderDetails.floor}],
            price: Object.values(sumOfAllOrders).reduce((prev,curr)=>prev+curr),
            deliveryPrice:5,
            paymentUponDelivery:orderDetails.paymentUponDelivery,
            notes:orderDetails.notes,
            additionalIngredients:[...order.map(item=>item.ingredients.map(item=>item))],
            quantity:[...quantity],
            pricePerItem:[...sumOfAllOrders],
            name: [...order.map(item=>item.donut.map(item=>item.name))]
    }

    dispatch(createOrder(orderToSend))
}
    //decrease quantity and update sum
    const decreaseQ = (index) => {
        dispatch(decreaseQuantity(index))
        dispatch(setTotalPriceOfEachOrder(index))
        setOrderDetails({
            ...orderDetails,
            quantity:[quantity.map(item=>item)],
            price: Object.values(sumOfAllOrders).reduce((prev,curr)=>prev+curr)
        }) 
    }

//get payment type - default is false for payment upon delivery
const paymentType = () => {
    setOrderDetails({
        ...orderDetails,
        paymentUponDelivery: 
        orderDetails.paymentUponDelivery === 'Yes' ? 'No' : 'Yes'
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
const getDeliveryAddress = (event) => {
    //as address and floor are part of one string, split
    //and get required values using indices
    setOrderDetails({
        ...orderDetails,
        address:event.target.value.split('/')[0],
        floor:event.target.value.split('/')[1] 
    })     
}


return(
<Container >

        <Row style={{borderStyle:"solid", marginBottom:'10px'}}>
            <Col style={{borderBottomStyle:'solid'}}>
                <h1 >Address to deliver</h1>
            </Col> 

            { orderDetails.error !== '' ? 
                <Row className='justify-content-center'>
                   <p style={{display:'inline', textAlign:'center', color:'red', fontSize:'20px'}}>
                     {orderDetails.error}
                  </p>
              </Row> : null }

            <Row className="justify-content-center" 
            style={{paddingTop:'10px', paddingBottom:'10px'}}>
                {/*  Address panel */}
                <RemoveUserAddress getDeliveryAddress={getDeliveryAddress}/>
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
                    orderDetails.paymentUponDelivery === 'Yes' ?
                    true : false}
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
                        {/* Change quantity buttons */}
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
          <SendOrder 
          orderNotes={orderNotes} 
          order={orderDough}
          />
        </Row>
    </Container>
    )
}
export default Order