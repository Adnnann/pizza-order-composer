import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form'
import Ingredients from '../features/ingredients.json'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/Image'
import glutenFree from '../assets/images/gluten-free.png'
import { useDispatch, useSelector } from 'react-redux';
import { getModal, setIngredients, setModal } from '../features/pizzaSlice';
import { useState, useEffect } from 'react';

const IngredientsSelector = () => {
  const showModal = useSelector(getModal)
  const dispatch = useDispatch()


  const [values,setValues] = useState({
    mozzarellaCheese: '',
    parmesanCheese:'',
    chedarCheese:'',
    livadaCheese:'',
    slickedBlackolives:'',
    slicedGreenOlivers:'',
    hotSauce:'',
    romaineLettuce:'',
    choppedArtichokeHearts:'',
    choppedTomato:'',
    slicedGreenOnion:'',
    mushrooms:'',
    sprinkleOfDryOregano:''

  })



  const handleChange = name => event => {
    setValues({...values, [name]:event.target.value})
    dispatch(setIngredients(event.target.value))
  }
    
  return(
            <>
              <Modal
                size="xs"
                show={showModal}
              
                 >
                
                <Modal.Header>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    Ingredients
                  </Modal.Title>
                 
                </Modal.Header>
                
                <Row style={{paddingLeft:'2.5%'}}>
                <div><Image src={glutenFree} style={{width:'30px', marginLeft:'10%', marginTop:'2px'}}></Image> - Gluten free</div>
                <Modal.Body className='overflow-auto' >
                 
                    {
                        Ingredients.data.map((item, index)=>{
                        return(
                            <>
                          <Row>
                          <Col xs={1} md={1} lg={1} xl={1}>
                            {
                              item.gluten_free ? 
                              <Image src={glutenFree} style={{width:'20px'}}></Image>
                              :''
                            }
                          </Col>
                            <Col xs={5} md={5} lg={5} xl={5}>
                       
                                <Form.Check 
                                type='radio'
                                id='default-radio'
                                name={item.name}
                                value={item.name}
                                label={item.name}
                                onChange={handleChange(item.name)}
                                
                                />
                          
                            </Col>
                            <Col xs={6} md={6} lg={6} xl={6}>
                                {`${item.price}$`}
                            </Col>
                            </Row> 
                        </>)
                        })
                    }
                 
                </Modal.Body>
                </Row>
                
                <Row style={{borderTopStyle:'solid', width:'95%', marginLeft:'2.5%'}}>
                <Col xs={4} md={4} lg={4} xl={4} 
                style={{marginLeft:'auto', marginTop:'2px', marginBottom:'2px'}}>
                <Button onClick={()=>/*dispatch(setModal(false))*/console.log(values)}>+ ADD TO CART</Button>
                </Col>
                
                </Row>
                
              </Modal>
            </>
          );
   
}

export default IngredientsSelector