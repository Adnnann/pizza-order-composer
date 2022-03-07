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

export const loginUser = createAsyncThunk('pizza/userLoginData', async(user)=>{
  return await axios.post('/auth/signin', user, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const saveUserAdress = createAsyncThunk('pizza/userAddress', async(address)=>{
  return axios.put(`/api/users/${address.id}`, {addressData:address}, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const removeUserAdress = createAsyncThunk('pizza/userAddress', async(removeAddress)=>{
  return axios.put(`/api/users/removeAddress/${removeAddress.param}`, {index:removeAddress.index}, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const readUserData = createAsyncThunk('pizza/userData', async(param)=>{
  return axios.get(`/api/users/${param}`, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const createOrder = createAsyncThunk('pizza/placeOrder', async(order)=>{
  return axios.post('/api/orders',order,{
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const getOrders = createAsyncThunk('pizza/allOrders', async()=>{
  return axios.get('/api/orders',{
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const userToken = createAsyncThunk('users/protected', async()=>{
  return await axios.get('/protected', { 
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response=>response.data)
  .catch(error=>error.message)
})

export const signoutUser = createAsyncThunk('users/user', async()=>{
  const response = await axios.post('/auth/signout')
  return response.data
})

const initialState = {
  //user data
  signinModal: false,
  signupModal: false,
  userProfile:{},
  userSigninData:{},
  signedInUser: false,
  userAddress:{},
  userData:{},
  userToken:{},
  signedOut:{},
  //orders
  placeOrder:{},
  allOrders:{},
  orderWindowModal:false,
  addressSelected:'',
  addressRemoved:'',
  selectedDough: [],
  showModal: false,
  order:[],
  quantity:[],
  totalPriceOfEachOrder:[],
  sumOfAllOrders:0,
  addUserAddress: false,
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
    setUserSiginStatus: (state, action) => {
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
      //console.log(Object.values(state.quantity))
      //quantity less than 0 do not decrease (prevent user from entering negative values)
      if(state.quantity[action.payload] > 0){
        state.quantity[action.payload] = state.quantity[action.payload] - 1
      }else{
        return
      }  
    },
    //use index to update price for specific order
    setTotalPriceOfEachOrder:(state,action) => {
        state.totalPriceOfEachOrder[action.payload] = 
        state.quantity[action.payload]*state.order[action.payload].price
         //in case quantity is set to 0 remove order from panel
        if(state.totalPriceOfEachOrder[action.payload] === 0){
          //set to null value with index action.payload
          state.order[action.payload] = null
          state.totalPriceOfEachOrder[action.payload] = null
          state.quantity[action.payload] = null
          //filter out null values
          state.order = state.order.filter(Boolean)
          state.totalPriceOfEachOrder = state.totalPriceOfEachOrder.filter(Boolean)
          state.quantity = state.quantity.filter(Boolean)
        }

    },
    addUserAdress: (state, action) => {
      state.addUserAddress = action.payload
    },
    setOrderWindowModal: (state, action) => {
      state.orderWindowModal = action.payload
    },
    clearOrder: (state) =>{
      state.order = []
      state.quantity = []
      state.selectedDough = []
      state.totalPriceOfEachOrder = []
      state.placeOrder = {}
    },
    resetStore:()=> initialState
  
  },
  //fetching from server
  extraReducers: {
    [fetchAsyncUser.fulfilled]:(state, {payload})=>{
        return {...state, userProfile:payload}
    },
    [loginUser.fulfilled]:(state, {payload})=>{
        return {...state, userSigninData:payload}
    },
    [saveUserAdress.fulfilled]:(state, {payload})=>{
      return {...state, userAddress:payload}
    },
    [readUserData.fulfilled]:(state, {payload})=>{
      return {...state, userData:payload}
    },
    [createOrder.fulfilled]:(state, {payload})=>{
      return {...state, placeOrder:payload}
    },
    [getOrders.fulfilled]:(state, {payload})=>{
      return {...state, allOrders:payload}
    },
    [userToken.fulfilled]:(state,{payload})=>{
      return {...state, userToken:payload}
    },
    [signoutUser.fulfilled]: (state, {payload}) => {
      return {...state, signedOut:payload}
    },
  }
   
});

export const getSigninModal = (state) => state.pizza.signinModal
export const getSignupModal = (state) => state.pizza.signupModal
export const getUserProfile = (state) => state.pizza.userProfile
export const getUserSigninData = (state) => state.pizza.userSigninData
export const getUserAddress = (state) => state.pizza.userAddress
export const getUserData = (state) => state.pizza.userData
export const getUserSigninStatus = (state) => state.pizza.signedInUser
export const getUserToken = (state) => state.pizza.userToken

//orders
export const getCreatedOrderData = (state) => state.pizza.placeOrder
export const getPlacedOrder = (state) => state.pizza.placeOrder
export const getAllOrders = (state) => state.pizza.allOrders
export const getOrderWindowModal = (state) => state.pizza.orderWindowModal
export const getSelectedDough = (state) => state.pizza.selectedDough
export const getModal = (state) => state.pizza.showModal
export const getOrder = (state) => state.pizza.order
export const getQuantity = (state) => state.pizza.quantity
export const getSumOfAllOrders = (state) => state.pizza.totalPriceOfEachOrder
export const getNewUserAddress = (state) => state.pizza.addUserAddress


export const {setSigninModal,
              setSignupModal,
              setUserSiginStatus, 
              setSelectedDough, 
              setModal, 
              setOrder,
              setQuantity,
              increaseQuantity,
              decreaseQuantity,
              setTotalPriceOfEachOrder,
              addUserAdress,
              removeOrder,
              addUserAddress,
              setOrderWindowModal,
              setIndexOfSelectedAddress,
              setIndexOfRemovedAddress,
              clearOrder,
              resetStore,
} = pizzaSlice.actions

export default pizzaSlice.reducer;
