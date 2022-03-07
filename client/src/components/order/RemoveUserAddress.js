
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row'
import Form from 'react-bootstrap/Form'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {getUserData, 
        getUserAddress, 
        getUserSigninData,
        readUserData,
        removeUserAdress,
} from '../../features/pizzaSlice'

const RemoveUserAddress = ({getDeliveryAddress}) => {
    
    const dispatch = useDispatch()
    const userData = useSelector(getUserData)
    const userSigninData = useSelector(getUserSigninData)
    const address = useSelector(getUserAddress)
 
    useEffect(()=>{
        //if address addedd successfully remove add address div
        //and featch new address from server
        if(address.hasOwnProperty('message')){
            dispatch(readUserData(userSigninData.user._id))
        }
    },[address])


    const remove = (index) => {
        const removeAddress = {
            param:userSigninData.user._id,
            index:index
        }
        dispatch(removeUserAdress(removeAddress))
    }

   

    return(

        Object.keys(userData).length !== 0 ?
            userData.address.map((item, index)=>{
                return(
                    <Col 
                    style={{borderStyle:'solid', 
                    //set height to fixed value to avoid Add new address 
                    marginLeft:'10px', marginBottom:'10px', height:'130px', paddingTop:"10px", paddingLeft:'2%'}}
                    xs={5} md={3} lg={3} xl={3}
                    key={index}>

                        {/* Remove address */}
                        <Row>
                            <Col style={{marginLeft:'75%'}}>
                            <button type="button" className="close" aria-label="Close" 
                            style={{borderStyle:'none', backgroundColor:'white'}} onClick={()=>remove(index)}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                            </Col>
                        </Row>
                    
                        <Row>
                            <Form.Check 
                                type='radio'
                                id='default-radio'
                                name='address'
                                //address values is used to control if user clicks delivery to specfic address and
                                //then removes that address 
                                value={item.address !== '' && item.floor !== ''  ?
                                item.address + '/' + item.floor : ''
                                }
                                label={item.address + ' ' + `\n` +  'Floor: '+ item.floor}
                                //enable showing label in two lines
                                style={{whiteSpace:'pre-wrap', display:'inline', marginLeft:'10px'}}
                                onChange={(e)=>getDeliveryAddress(e)}
                                readOnly
                                />
                        </Row>
                    </Col>

                )
            
            })
            
    :null  
    )
}

export default RemoveUserAddress