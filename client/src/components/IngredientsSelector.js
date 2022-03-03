import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form'
import Ingredients from '../features/ingredients.json'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/Image'
import glutenFree from '../assets/images/gluten-free.png'
import { useDispatch, useSelector } from 'react-redux';
import {getModal, 
        getOrder, 
        getQuantity, 
        getSelectedDonut, 
        setModal, 
        setOrder,
        setQuantity,
        setTotalPriceOfEachOrder
} from '../features/pizzaSlice';
import { useState } from 'react';

const IngredientsSelector = () => {
  const showModal = useSelector(getModal)
  const dispatch = useDispatch()
  const selectedDonut = useSelector(getSelectedDonut)
  const quantity = useSelector(getQuantity)

  const priceArr = []

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

  let ingredients = ''

  const handleChange = (ingredient, price) => {
    ingredients += `${ingredient}, `
    priceArr.push(price)
  }

  //main function for placing orders. Ingridients are stored in array
  const addToCart = () => {

    let price = ''
    
    priceArr.length > 0 ? 
    price = priceArr.reduce((prev, curr)=>prev+curr) + selectedDonut[selectedDonut.length - 1].price
    : price = selectedDonut[selectedDonut.length - 1].price
    //all orders data
    dispatch(setOrder({
      donut: selectedDonut,
      price: price,
      ingredients: ingredients.substring(0,ingredients.length - 2).split(','),
    }))
    //set modal windows for selection of ingridentis to true
    dispatch(setModal(false))
    //set initial quantity to 1. On OrderPanel components quantity is increased or decreased
    dispatch(setQuantity(1))
    //set initial sum to price * quantity. Also important if user does not select any ingridients
    //action will just add to total value of donut
    dispatch(setTotalPriceOfEachOrder(quantity.length))

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
                           
                          <Row key={index}>
                          <Col xs={1} md={1} lg={1} xl={1}>
                            {
                              item.gluten_free ? 
                              <Image src={glutenFree} style={{width:'20px'}}></Image>
                              :''
                            }
                          </Col>
                            <Col xs={5} md={5} lg={5} xl={5} >
                       
                                <Form.Check 
                                type='radio'
                                id='default-radio'
                                name={item.name}
                                value={item.name}
                                label={item.name}
                                onChange={()=>handleChange(item.name, item.price)}
                                
                                />
                          
                            </Col>
                            <Col xs={6} md={6} lg={6} xl={6}>
                                {`${item.price}$`}
                            </Col>
                            </Row> 
                        )
                        })
                    }
                 
                </Modal.Body>
                </Row>
                
                <Row style={{borderTopStyle:'solid', width:'95%', marginLeft:'2.5%'}}>
                <Col xs={4} md={4} lg={4} xl={4} 
                style={{marginLeft:'auto', marginTop:'2px', marginBottom:'2px'}}>
                <Button onClick={addToCart}>+ ADD TO CART</Button>
                </Col>
                
                </Row>
                
              </Modal>
            </>
          );
   
}

export default IngredientsSelector