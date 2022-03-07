
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch, useSelector } from 'react-redux'
import {getNewUserAddress,
        addUserAdress,
        saveUserAdress,
        getUserSigninData,
        getUserAddress,
        readUserData,
        userToken,
        getUserToken,
        getUserSigninStatus,
        clearOrder
} from '../../features/pizzaSlice'
import Form from 'react-bootstrap/Form'
import jwtDecode from 'jwt-decode'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AddNewAddress = () => {

    const dispatch = useDispatch()
    const newAdress = useSelector(getNewUserAddress)
    const address = useSelector(getUserAddress)
    const userData = useSelector(getUserSigninData)
    const id = Object.keys(userData).length !== 0 ? jwtDecode(userData.token)._id : ''
    const navigate = useNavigate()
    const token = useSelector(getUserToken)
    const userSignedin = useSelector(getUserSigninStatus)

    useEffect(()=>{
        dispatch(userToken())
        //In case user tried to visit url /protected without token, redirect 
        //to signin page
        if(token === 'Request failed with status code 500' 
            || token ==='Request failed with status code 401'){
            dispatch(clearOrder())
            navigate('/')
        }

        //if address addedd successfully remove add address div
    //and featch new address from server
    if(address.hasOwnProperty('message')){
        dispatch(readUserData(id))
        dispatch(addUserAdress(false))
    }

    },[address, token.length, dispatch])

    const [userAddress, setUserAddress] = useState({
        address:'',
        floor:'',
        error:''
    })

    const handleChange = name => event => {
        setUserAddress({...userAddress, [name]:event.target.value})
    }

    const saveAddress = () => {
      
        //validation of address is done on frontend.
        //Both values have to be entered (floor and address) and floor value must be number
        if(userAddress.address === '' || userAddress.floor === ''){
            setUserAddress({...userAddress, error:'Enter values in both fields'})
        }else if(!userAddress.floor.toString().match(/^[0-9]*$/)){
            setUserAddress({...userAddress, error:'Floor must be number'})
            return
        }else{
            setUserAddress({...userAddress, error:''})
            const address = {
                id: id,
                address:userAddress.address,
                floor:userAddress.floor
            }

            dispatch(saveUserAdress(address))
            setUserAddress({
                address:'',
                floor:'',
                error:''
            })
        }  
    }

    const cancel = () => {
        setUserAddress({...userAddress, error:''})
        dispatch(addUserAdress(false))
    }


    return(
<>
        {!newAdress && userSignedin ?
     
            <Col onClick={()=>dispatch(addUserAdress(true))}
            style={{borderStyle:'solid', opacity:'0.2', backgroundColor:'grey', borderColor:'black', height:'130px', paddingTop:'20px', color:'black', marginLeft:'10px', textAlign:'center'}}
            xs={5} md={3} lg={3} xl={3}>
                <h1 style={{marginTop:'10px', fontSize:"50px", color:'black'}}>+</h1>
            </Col> 
      : <Col style={{borderStyle:'solid', borderColor:'black', height:'130px', padding:'0px', color:'black', marginLeft:'10px', textAlign:'center', paddingTop:'2px'}}
            xs={12} md={3} lg={3} xl={3}>
            
            <Row>
            <Col xs={3} md={3} lg={3} xl={3}>
            <p style={{display:'inline-flex', fontSize:'14px'}}>Address:</p>
            </Col>

            <Col xs={8} md={8} lg={8} xl={8}>
               <Form.Control  
               type="text" placeholder="Add address" style={{height:"30px"}} onChange={handleChange('address')} />
            </Col>

            <Col xs={3} md={3} lg={3} xl={3}>
                <p style={{display:'inline-flex', fontSize:'14px'}}>Floor:</p>
            </Col>

            <Col xs={6} md={6} lg={6} xl={6} style={{marginBottom:'10px'}}>
                <Form.Control type="text"  placeholder="Add floor" style={{height:"30px"}} onChange={handleChange('floor')}/>
            </Col>
        </Row>

        

        <Row className="justify-content-end">
            <Col xs={7} md={9} lg={9} xl={9}>

                <Button style={{fontSize:'12px'}} onClick={cancel}>
                    CANCEL
                </Button>

                <Button style={{marginLeft:'10px', fontSize:'12px'}} onClick={saveAddress} >
                    ADD
                </Button>

            </Col> 
            
            </Row>
            
            </Col> 
            
        }
        { userAddress.error !== '' ? 
                <Row className='justify-content-center'>
                   <p style={{display:'inline', textAlign:'center', color:'red', fontSize:'20px'}}>
                     {userAddress.error}
                  </p>
              </Row> : null }
              </>
         
    )
}

export default AddNewAddress