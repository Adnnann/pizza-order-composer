import Donuts from '../features/donuts.json'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button'

const LeftPanelHome = () => {

    return(

        <Col  
        xs={12} 
        md={{span:5, offset:2}} 
        lg={{span:5, offset:2}}  
        xl={{span:5, offset:2}} 
        style={{borderStyle:"solid",
        borderBottomStyle:'solid', 
        paddingLeft:'2%', paddingRight:'2%', marginRight:'10px'}}>
               

            <Row style={{marginTop:'2%', marginBottom:'2%', borderBottomStyle:'solid'}}>
                <Col>
                    <h1>Pick a dough</h1>
                </Col> 
            </Row>
                   
                
            {Donuts.data.map((item, index)=>{
                return(
                    <Row style={{borderBottomStyle:'solid', marginBottom:'10px'}} key={index}>

                        <Col xs={9} md={9} lg={9} xl={9}>
                            <h4>{item.name}</h4>
                            <p style={{fontSize:"12px"}}>{item.desc}</p>
                        </Col> 
        
                        <Col xs={3} md={3} lg={3} xl={3}  >
                            <Button style={{marginLeft:'auto'}}>ADD</Button>
                        </Col> 
            
                    </Row> 
                    )
                })
            }
    </Col>
    ) 
}

export default LeftPanelHome

