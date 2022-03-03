import Donuts from '../features/donuts.json'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch } from 'react-redux'
import { getModal, setModal, setSelectedDonut } from '../features/pizzaSlice'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const LeftPanelHome = () => {

const dispatch = useDispatch()
const navigate = useNavigate()



    const selectedDonut = (name) => {
        dispatch(setSelectedDonut(Donuts.data.filter(item=>item.name === name)))
        dispatch(setModal(true))
        navigate('/orders')

    }

    return(

        <Col  
        xs={12} 
        md={{span:5, offset:1}} 
        lg={{span:5, offset:1}}  
        xl={{span:5, offset:1}} 
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

                        <Col xs={8} md={8} lg={8} xl={8}>
                            <h4>{item.name}</h4>
                            <p style={{fontSize:"12px"}}>{item.desc}</p>
                        </Col> 
        
                        <Col xs={1} md={1} lg={1} xl={1} style={{marginRight:"5px"}} >
                            <p style={{fontSize:'16px'}}>{`${item.price}$`}</p>
                        </Col> 

                        <Col xs={2} md={2} lg={2} xl={2}  >
                            <Button style={{marginLeft:'auto', fontSize:'12px'}} onClick={()=>selectedDonut(item.name)}>+ADD</Button>
                        </Col> 
            
                    </Row> 
                    )
                })
            }
    </Col>
    ) 
}

export default LeftPanelHome

