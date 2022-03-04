import Image from 'react-bootstrap/Image'
import Cart from '../../assets/images/cart.svg'
import Col from 'react-bootstrap/Col'
const RightSidePanel = () =>{
    return(
        <Col xs={12} md={5} lg={5}  xl={5}
        style={{borderStyle:'solid'}} 
        className='d-flex justify-content-center'>
            <Image src={Cart} width={'200px'} />
        </Col>
    )
}
export default RightSidePanel