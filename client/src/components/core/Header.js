import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/esm/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import Avatar from '../../assets/images/avatar.svg'
import Cart from '../../assets/images/cart.svg'
import Pizza from '../../assets/images/pizza.png'
import {useSelector} from "react-redux"
import { getUserSigninStatus } from '../../features/pizzaSlice'
const Header = () => {

    const userSigninStatus = useSelector(getUserSigninStatus)

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

            <Nav.Item style={{marginLeft:'auto'}}>
                <Image src={Cart} width={'50px'} />
            </Nav.Item>

            
                
            {userSigninStatus ?
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
            
            : <Nav.Item style={{marginTop:'1%', marginLeft:"1%", marginRight:"2%"}}>
                    <Button>Sign in</Button>
                </Nav.Item>
            }

      </Nav>
     
    </>
    )
}

export default Header