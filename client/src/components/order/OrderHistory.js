import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders, 
        getUserToken, 
        userToken 
} from "../../features/pizzaSlice"
import dateFormat from 'dateformat'
import _ from 'lodash'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
const OrderHistory = () => {

    const allOrders = useSelector(getAllOrders)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector(getUserToken)

    useEffect(()=>{

        dispatch(userToken())
        //In case user tried to visit url /protected without token, redirect 
        //to signin page
        if(token === 'Request failed with status code 500' 
            || token ==='Request failed with status code 401'){
            return navigate('/')
        }

    },[token.length, dispatch])
    
    return(
    <Container>
        
    {Object.keys(allOrders).length !== 0  ?
          
    allOrders.map((item, mainIndex)=>{

    return(
        <Row key={mainIndex}>

            <Row style={{borderBottom:'solid'}}>
            <Col xs={8} md={8} lg={8} xl={8} style={{whiteSpace:'pre-wrap'}}>
            {allOrders[mainIndex].name.map((item,nameIndex)=>{
                //indexes are used to enable displaying each order by name and ingredients
                //as both are stored in arrays with different lenghts
                return( 
                <span key={Math.random()+100}>
                <h4>{_.chain(allOrders[mainIndex].name).map(item=>item).value()[nameIndex]}
                <span style={{fontSize:"12px"}}>{` (Price per item: ${allOrders[mainIndex].pricePerItem[nameIndex]/allOrders[mainIndex].quantity[nameIndex]}$ | quantity: ${allOrders[mainIndex].quantity[nameIndex]})`}</span></h4>
                {_.chain(allOrders[mainIndex].additionalIngredients).map(item=>item + `\n`).value()[nameIndex]+ '  '
                }

                <hr/>
                </span>
                )
            })}
        
            </Col>  

            <Col xs={4} md={4} lg={4} xl={4} style={{whiteSpace:'pre-wrap', textAlign:'center', marginTop:'auto',marginBottom:'auto'}}>
                <p>
                    <span style={{fontWeight:'bold'}}>{(Number(item.price)+5)+'$' + `\n`}</span>
                    <span style={{fontSize:'12px'}}>{dateFormat(new Date(allOrders[mainIndex].created),'dd/mm/yyyy HH:MM')}</span>
                </p>
            
            </Col> 
            </Row>
        </Row>) 
        })
        :null}
    </Container>  
    )
}

export default OrderHistory