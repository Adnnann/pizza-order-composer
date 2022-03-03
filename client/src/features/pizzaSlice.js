import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  signedInUser: false,
  selectedpizza: [],
  showModal: false,
  order:[],
  quantity:[],
  totalPriceOfEachOrder:[],
  sumOfAllOrders:0
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState, 

  reducers: {
    setUserSiginUser: (state, action) => {
      state.signedInUser = action.payload
    },
    setSelectedpizza: (state, action) => {
      state.selectedpizza = action.payload 
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
    }

  },
  extraReducers: () => {}
   
});

export const getUserSigninStatus = (state) => state.pizza.signedInUser
export const getSelectedDonut = (state) => state.pizza.selectedpizza
export const getModal = (state) => state.pizza.showModal
export const getOrder = (state) => state.pizza.order
export const getQuantity = (state) => state.pizza.quantity
export const getSumOfAllOrders = (state) => state.pizza.totalPriceOfEachOrder

export const {setUserSiginUser, 
              setSelectedDonut, 
              setModal, 
              setOrder,
              setQuantity,
              increaseQuantity,
              decreaseQuantity,
              setTotalPriceOfEachOrder,
} = pizzaSlice.actions

export default pizzaSlice.reducer;
