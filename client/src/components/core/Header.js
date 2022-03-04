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
import {getOrder, 
        getSigninModal, 
        getUserSigninStatus,
        setSigninModal 
} from '../../features/pizzaSlice'
const Header = () => {

    const userSignedin = useSelector(getUserSigninStatus)
    const dispatch = useDispatch()
    const signinModal = useSelector(getSigninModal)
    const order = useSelector(getOrder)


    const test = () => {
        dispatch(setSigninModal(true))
        console.log(signinModal)
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

            <Nav.Item style={{marginLeft:'auto', marginBottom:'2px'}}>
               {<Image src={Object.keys(order).length !== 0 ? CartFull : Cart } width={'50px'} /> } 
            </Nav.Item>

            
                
            {userSignedin ?
            <Nav.Item style={{marginLeft:"1%", marginRight:"2%"}}>
                <Dropdown>

                    <Dropdown.Toggle style={{backgroundColor:"white", borderStyle:'none'}}>
                        <Image src={Avatar} as={ButtonGroup} style={{backgroundColor:"white"}} width={'50px'} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>Orders history</Dropdown.Item>
                        <Dropdown.Item>Logout</Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>

            </Nav.Item>
            
            : <Nav.Item style={{marginLeft:"1%", marginRight:"2%", marginTop:'7px'}}>
                    <Button onClick={()=>test()}>Sign in</Button>
                </Nav.Item>
            }

      </Nav>
     
    </>
    )
}

export default Header