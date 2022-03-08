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
        getSumOfAllOrders, 
        getUserSigninStatus,
        setSigninModal
} from '../../features/pizzaSlice'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useNavigate } from 'react-router-dom'

const OrderPanel = () =>{
   
    const navigate = useNavigate()
    const quantity = useSelector(getQuantity)
    const dispatch = useDispatch()
    const order = useSelector(getOrder)
    const sumOfAllOrders = useSelector(getSumOfAllOrders)
    const userSigninStatus = useSelector(getUserSigninStatus)

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

    const buy = () => {
        //if user is not signed in display modal window with signin form
        if(userSigninStatus){
            navigate('/order')
        }else{
        //user signed - proceed to order
            dispatch(setSigninModal(true))
        }
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

                        <Col xs={6} md={7} lg={7} xl={7}>
                            <h4>{item.donut.map(item=>item.name)}</h4>
                            <p style={{fontSize:"12px"}}>{`${item.ingredients.map(item=>item)}`}</p>
                        </Col> 
        
                        <Col xs={2} md={2} lg={2} xl={2} >
                            <p style={{fontSize:'16px'}}>{`${item.price*quantity[index]}$`}</p>
                        </Col> 

                        <Col xs={3} md={3} lg={3} xl={3}  >
                            <ButtonGroup  >
                                <Button style={{fontSize:"10px", padding:'7px'}} 
                                 onClick={()=>decreaseQ(index, item.price)}>-</Button> 
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

           <Row>
           {/* If there are no orders in cart Buy button will not
           be displayed */}
           {Object.values(order).length !== 0 ?
                <Row className='justify-content-end'>
                    <Col xs={5} md={4} lg={4} xl={4}>
                        <Button style={{marginBottom:'10px', minWidth:"120px"}} 
                        onClick={buy}>Buy</Button>
                    </Col>
                </Row>  
           : null} 
           </Row>
           
        </Col>
        
    )
}
export default OrderPanel