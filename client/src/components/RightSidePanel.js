import Image from 'react-bootstrap/Image'
import Cart from '../assets/images/cart.svg'
import Col from 'react-bootstrap/Col'
const RightSidePanel = () =>{
    return(
        <Col xs={12} md={{span:3}} lg={{span:3}}  xl={{span:3}}
        style={{borderStyle:'solid'}} className='d-flex justify-content-center'>
            <Image src={Cart} width={'200px'} />
        </Col>
    )
}
export default RightSidePanel