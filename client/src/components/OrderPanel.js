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
import { useEffect, useState } from 'react'


const OrderPanel = () =>{
   
    
    const quantity = useSelector(getQuantity)
    const dispatch = useDispatch()
    const order = useSelector(getOrder)
    const sumOfAllOrders = useSelector(getSumOfAllOrders)
    
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

    return(

        <Col  
        xs={12} 
        md={{span:5}} 
        lg={{span:5}}  
        xl={{span:5}}  
        style={{borderStyle:"solid",
        borderBottomStyle:'solid', 
        paddingLeft:'2%', paddingRight:'2%', marginRight:'10px'}}>
            
        <Row style={{marginTop:'2%', marginBottom:'2%', borderBottomStyle:'solid'}}>
            <Col>
                <h1>Order</h1>
            </Col> 
        </Row>
        
       {order.map((item, index)=>{
                return(
                    <Row style={{borderBottomStyle:'solid', marginBottom:'10px'}} key={index}>

                        <Col xs={7} md={7} lg={7} xl={7}>
                            <h4>{item.donut.map(item=>item.name)}</h4>
                            <p style={{fontSize:"12px"}}>{`${item.ingredients.map(item=>item)}`}</p>
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
                        
                    </Row>  
                    ) 
                }) 
           } 
           <Row style={{marginTop:'60%', paddingLeft:'2%', padding:'0'}}>

                <Col xs={8} md={8} lg={8} xl={8}>
                <p style={{fontWeight:'bold'}}>Delivery: 5$</p>
                </Col>
    
           </Row>

           <Row style={{paddingLeft:'2%', borderTopStyle:'solid'}}>

               <Col xs={8} md={8} lg={8} xl={8}>
                <span>
                    <p style={{fontWeight:'bold', display:'inline'}}>TOTAL:</p>
                    <p style={{fontWeight:'bold', display:'inline'}}>{
                    Object.keys(sumOfAllOrders).length !== 0 ? 
                    ` ${Object.values(sumOfAllOrders).reduce((prev,curr)=>prev+curr) + 5}$`
                    : 0}</p>
                </span>
               </Col>
               
           </Row>
           
        </Col>
        
    )
}
export default OrderPanel