
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch, useSelector } from 'react-redux'
import {getNewUserAddress,
        addUserAdress
} from '../../features/pizzaSlice'
import Form from 'react-bootstrap/Form'

const AddNewAddress = () => {

    const dispatch = useDispatch()
    const newAdress = useSelector(getNewUserAddress)

    return(
        <>
        {!newAdress ?
            <Col onClick={()=>dispatch(addUserAdress(true))}
            style={{borderStyle:'solid', opacity:'0.2', backgroundColor:'grey', borderColor:'black', height:'130px', paddingTop:'20px', color:'black', marginLeft:'10px', textAlign:'center'}}
            xs={5} md={3} lg={3} xl={3}>
                <h1 style={{marginTop:'10px', fontSize:"50px", color:'black'}}>+</h1>
            </Col> 
      : <Col onClick={()=>dispatch(addUserAdress(false))}
            style={{borderStyle:'solid', borderColor:'black', height:'130px', padding:'0px', color:'black', marginLeft:'10px', textAlign:'center', paddingTop:'2px'}}
            xs={12} md={3} lg={3} xl={3}>
            
            <Row>
            <Col xs={3} md={3} lg={3} xl={3}>
            <p style={{display:'inline-flex', fontSize:'14px'}}>Address:</p>
            </Col>

            <Col xs={8} md={8} lg={8} xl={8}>
            
               <Form.Control  type="text" placeholder="Add address" style={{height:"30px"}} />
            </Col>

            <Col xs={3} md={3} lg={3} xl={3}>
                <p style={{display:'inline-flex', fontSize:'14px'}}>Floor:</p>
            </Col>

            <Col xs={6} md={6} lg={6} xl={6} style={{marginBottom:'10px'}}>
                <Form.Control type="text" placeholder="Add floor" style={{height:"30px"}}/>
            </Col>
        </Row>

        <Row className="justify-content-end">
               <Col xs={7} md={9} lg={9} xl={9}>
                <Button style={{fontSize:'12px'}}>
                    CANCEL
                </Button>
                <Button style={{marginLeft:'10px', fontSize:'12px'}}>
                    ADD
                </Button>

            </Col> 
            
            </Row>
            </Col> 
        }
        </>
    )
}

export default AddNewAddress