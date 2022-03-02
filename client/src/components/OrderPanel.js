import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getModal, getSelectedDonut } from '../features/pizzaSlice'
import Donuts from '../features/donuts.json'
import { useEffect } from 'react'

const OrderPanel = () =>{
   
    const dispatch = useDispatch()
    const order = useSelector(getSelectedDonut)

    return(

        <Col  
        xs={12} 
        md={{span:4}} 
        lg={{span:4}}  
        xl={{span:4}} 
        style={{borderStyle:"solid",
        borderBottomStyle:'solid', 
        paddingLeft:'2%', paddingRight:'2%', marginRight:'10px'}}>
               
        
            <Row style={{marginTop:'2%', marginBottom:'2%', borderBottomStyle:'solid'}}>
                <Col>
                    <h1>Order</h1>
                </Col> 
            </Row>
        
       {order.map((item, index)=>{
                console.log(item)
                return(
                    <Row style={{borderBottomStyle:'solid', marginBottom:'10px'}} key={index}>

                        <Col xs={8} md={8} lg={8} xl={8}>
                            <h4>{item.name}</h4>
                            <p style={{fontSize:"12px"}}>{item.desc}</p>
                        </Col> 
        
                        <Col xs={1} md={1} lg={1} xl={1} style={{marginRight:"5px"}} >
                            <p style={{fontSize:'16px'}}>{`${item.price}$`}</p>
                        </Col> 

                        <Col xs={2} md={2} lg={2} xl={2}  >
                            <Button style={{marginLeft:'auto', fontSize:'12px'}} onClick={()=>dispatch(getModal(true))}>+ADD</Button> 
                        </Col>  
            
                    </Row>  
                    ) 
                }) 
           }
        </Col>
    )
}
export default OrderPanel