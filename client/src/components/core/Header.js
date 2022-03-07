import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/esm/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Avatar from '../../assets/images/avatar.svg'
import Cart from '../../assets/images/cart.svg'
import CartFull from '../../assets/images/cart-fill.svg'
import Pizza from '../../assets/images/pizza.png'
import {useDispatch, useSelector} from "react-redux"
import {getQuantity, 
        getSigninModal, 
        getUserSigninStatus,
        resetStore,
        setSigninModal,
        signoutUser
} from '../../features/pizzaSlice'
import { useNavigate } from 'react-router-dom'
const Header = () => {

    const dispatch = useDispatch()
    const signinModal = useSelector(getSigninModal)
    const quantity = useSelector(getQuantity)
    const userSigninStatus = useSelector(getUserSigninStatus)
    const navigate = useNavigate()

    const signinUser = () => {
        dispatch(setSigninModal(true))
    }

    const signout = () => {
        dispatch(resetStore())
        dispatch(signoutUser())
        navigate('/')
    }

    return(
        <>
        <Nav className="justify-content-start" 
        style={{marginBottom:"5%", borderBottomStyle:'solid', borderBottomWidth:'1px', marginTop:'2%', width:"98%", marginLeft:'1%'}}>
            
            <Nav.Item style={{marginLeft:"2%"}}>
                <Image src={Pizza} width={'50px'} />
            </Nav.Item>

            <Nav.Item style={{marginLeft:"2%"}}>
                <h1>Pizza Composer App</h1>
            </Nav.Item>

            <Nav.Item style={{marginLeft:'auto', marginBottom:'2px'}} onClick={()=>navigate('/addToCart')}>
               {<Image src={Object.keys(quantity).length !== 0 && Object.values(quantity).reduce((prev, curr)=>prev+curr) > 0 ? CartFull : Cart } width={'50px'} /> } 
            </Nav.Item>

            
                
            {userSigninStatus ?
            <Nav.Item style={{marginLeft:"1%", marginRight:"2%"}}>
                <Dropdown>

                    <Dropdown.Toggle style={{backgroundColor:"white", borderStyle:'none'}}>
                        <Image src={Avatar} as={ButtonGroup} style={{backgroundColor:"white"}} width={'50px'} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>navigate('/orderHistory')}>Orders history</Dropdown.Item>
                        <Dropdown.Item onClick={signout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>

            </Nav.Item>
            
            : <Nav.Item style={{marginLeft:"1%", marginRight:"2%", marginTop:'7px'}}>
                    <Button onClick={()=>signinUser()}>Sign in</Button>
                </Nav.Item>
            }

      </Nav>
     
    </>
    )
}

export default Header