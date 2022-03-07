import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import AddToCartLeftPanel from "./AddToCartLeftPanel"
import OrderPanel from './OrderPanel'
import IngredientsSelector from './IngredientsSelector'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, getUserSigninStatus, getOrders } from '../../features/pizzaSlice'
import { useNavigate } from 'react-router-dom'
const AddToCart = () => {

    const userSignedIn = useSelector(getUserSigninStatus)
    const userData = useSelector(getUserData)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{

        if(!userSignedIn){
            navigate('/')
        }
        dispatch(getOrders(userData._id))

    },[])

    return(
        <Container>
            <Row>
                <AddToCartLeftPanel />
                <OrderPanel />
                <IngredientsSelector />
            </Row>
        </Container>
    )
}
export default AddToCart