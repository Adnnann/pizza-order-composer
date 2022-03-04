
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
const UserAddresses = ({getDeliveryAddress}) => {
//dummy array - REMOVE AFTER ADDING ADDRESS TO USER PROFILE.
    //GET DATA FROM STORE
    const address = [
        {address:'Maglajska 1', floor:'5 sprat'},
        {address:'Maglajska 1', floor:'3 sprat'},
        {address:'Maglajska 1', floor:'3 sprat'}
    ]

    return(
            address.map((item, index)=>{
                return(
                <Col 
                style={{borderStyle:'solid', 
                //set height to fixed value to avoid Add new address 
                marginLeft:'10px', marginBottom:'10px', height:'130px', paddingTop:"30px"}}
                xs={5} md={3} lg={3} xl={3}
                key={index}>
                    <Form.Check 
                        type='radio'
                        id='default-radio'
                        name='address'
                        value={item.address !== '' && item.floor !== '' ?
                            item.address + item.floor : ''}
                        label={item.address + `\n` + item.floor}
                        //enable showing label in two lines
                        style={{whiteSpace:'pre-wrap'}}
                        onChange={getDeliveryAddress}
                        readOnly
                        />
                        
                </Col>
                )
            })
            
        
    )
}

export default UserAddresses