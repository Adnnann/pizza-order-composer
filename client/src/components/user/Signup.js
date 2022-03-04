import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Image from "react-bootstrap/esm/Image";
import Pizza from '../../assets/images/pizza.png'
import { useSelector, useDispatch } from "react-redux";
import {getSigninModal, 
        getSignupModal, 
        setSigninModal, 
        setSignupModal,
        fetchAsyncUser
} from "../../features/pizzaSlice";
import { useState } from "react";

const Signup= () => {

    const signupModalStatus = useSelector(getSignupModal)
    const dispatch = useDispatch()

    const [userData, setUserData] = useState({
      name:'',
      email:'',
      password:''
    })

    const redirectToSignin = () => {
        dispatch(setSigninModal(true))
        dispatch(setSignupModal(false))
    }

    const handleChange = name => event => {
      setUserData({...userData, [name]: event.target.value})
    }

    const createProfile = () => {
      const user = {
        name: userData.name,
        email: userData.email,
        password: userData.password
      }
      dispatch(fetchAsyncUser(user))

    }

    return (
      <Modal
        show={signupModalStatus}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        
      <Row className="justify-content-center">
      {/* left side signin modal */}
 
          <Col xs={12} md={6} lg={6} xl={6}>
             <Image src={Pizza} width={'150px'} style={{marginLeft:'30%', marginTop:'10%', marginBottom:'10%'}} />
          </Col>

          <Col xs={12} md={6} lg={6} xl={6} style={{paddingTop:'5%'}}>
            {/* USERNAME */}
           <Row style={{paddingRight:"20px", paddingLeft:'20px'}}>
                <Col xs={3} md={3} lg={3} xl={3} >
                    <p style={{fontSize:'14px', textAlign:'right'}}>Username:</p>
                </Col>

                <Col xs={8} md={8} lg={8} xl={8} style={{marginBottom:'10px'}}>
                   <Form.Control type="text" id='name' style={{height:"30px"}} onChange={handleChange('name')}/>
                </Col>
            {/* EMAIL */}
                <Col xs={3} md={3} lg={3} xl={3} >
                    <p style={{fontSize:'14px', textAlign:'right'}}>Email:</p>
                </Col>

                <Col xs={8} md={8} lg={8} xl={8} style={{marginBottom:'10px'}}>
                   <Form.Control type="email" style={{height:"30px"}} onChange={handleChange('email')}/>
                </Col>

                {/* PASSWORD */}
                <Col xs={3} md={3} lg={3} xl={3} >
                    <p style={{fontSize:'14px', textAlign:'right'}} onChange={handleChange('password')}>Password:</p>
                </Col>

                <Col xs={8} md={8} lg={8} xl={8} style={{marginBottom:'10px'}}>
                   <Form.Control type="password" style={{height:"30px"}}/>
                </Col>
                {/* REPEATED PASSWORD */}
                <Col xs={3} md={3} lg={3} xl={3} >
                    <p style={{fontSize:'14px', textAlign:'right'}}>Password:</p>
                </Col>

                <Col xs={8} md={8} lg={8} xl={8} style={{marginBottom:'10px'}}>
                   <Form.Control type="password" style={{height:"30px"}}/>
                </Col>
                <hr />
            </Row>
          
            <Row className='justify-content-center' style={{marginBottom:'2%'}}>
                <Col xs={4} md={4} lg={4} xl={4} >
                   <Button onClick={createProfile}>SIGN UP</Button>
                </Col>
            </Row>

              <Row className='justify-content-center'>
             
                   <p style={{display:'inline', textAlign:'center'}}>Already have an account <a href="#" onClick={()=>redirectToSignin()}>Sign in</a> </p>
            
            </Row> 
        
          </Col>
        </Row>
      </Modal>
    );
  }

  export default Signup
  
  