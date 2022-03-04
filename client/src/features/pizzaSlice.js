import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const fetchAsyncUser = createAsyncThunk('pizza/userProfile', async(user)=>{
  return await axios.post('api/users/', user, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})


const initialState = {
  signinModal: false,
  signupModal: false,
  userProfile:{},
  signedInUser: false,
  selectedDough: [],
  showModal: false,
  order:[],
  quantity:[],
  totalPriceOfEachOrder:[],
  sumOfAllOrders:0,
  addUserAddress: false
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState, 

  reducers: {
    setSigninModal:(state, action) => {
      state.signinModal = action.payload
    },
    setSignupModal:(state, action) => {
      state.signupModal = action.payload
    },
    setUserSiginUser: (state, action) => {
      state.signedInUser = action.payload
    },
    setSelectedDough: (state, action) => {
      state.selectedDough = action.payload 
    },
    setModal:(state, action) => {
      state.showModal = action.payload
    },
    setOrder:(state, action) => {
       //write this somewhere!!!!
      return {
        ...state, 
        order: state.order.concat(action.payload)
      }
    },
    //set all quantites in array
    setQuantity:(state,action) => {
      return {
        ...state, 
        quantity: state.quantity.concat(action.payload),
      }
    },
    //quantity is sent in setQuantity action. Actions below are used to increase or
    //decrease quantity
    increaseQuantity:(state, action) => {
        state.quantity[action.payload] = state.quantity[action.payload] + 1
    },
    decreaseQuantity:(state, action) => {
      //quantity less than 0 do not decrease (prevent user from entering negative values)
      if(state.quantity[action.payload] > 0){
        state.quantity[action.payload] = state.quantity[action.payload] - 1
      }else{
        return
      }  
    },
    //use index to update price for specific order
    setTotalPriceOfEachOrder:(state,action) => {
        state.totalPriceOfEachOrder[action.payload] = state.quantity[action.payload]*state.order[action.payload].price
    },
    addUserAdress: (state, action) => {
      state.addUserAddress = action.payload
    }

  },
  //fetching from server
  extraReducers: {
    [fetchAsyncUser.fulfilled]:(state, {payload})=>{
      console.log(payload)
        return {...state, userProfile:payload}
    },
    [fetchAsyncUser.rejected]:(state, {payload})=>{
      console.log(payload)
  }
  }
   
});

export const getSigninModal = (state) => state.pizza.signinModal
export const getSignupModal = (state) => state.pizza.signupModal
export const getUserProfile = (state) => state.pizza.userProfile
export const getUserSigninStatus = (state) => state.pizza.signedInUser
export const getSelectedDough = (state) => state.pizza.selectedDough
export const getModal = (state) => state.pizza.showModal
export const getOrder = (state) => state.pizza.order
export const getQuantity = (state) => state.pizza.quantity
export const getSumOfAllOrders = (state) => state.pizza.totalPriceOfEachOrder
export const getNewUserAddress = (state) => state.pizza.addUserAddress


export const {setSigninModal,
              setSignupModal,
              setUserSiginUser, 
              setSelectedDough, 
              setModal, 
              setOrder,
              setQuantity,
              increaseQuantity,
              decreaseQuantity,
              setTotalPriceOfEachOrder,
              addUserAdress
} = pizzaSlice.actions

export default pizzaSlice.reducer;
