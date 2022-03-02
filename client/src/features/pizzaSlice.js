import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  signedInUser: false,
  selectedDonut: [],
  showModal: false,
  ingredients:[]
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState, 

  reducers: {
    setUserSiginUser: (state, action) => {
      state.signedInUser = action.payload
    },
    setSelectedDonut: (state, action) => {
      //write this somewhere!!!!
      return {
        ...state, 
        selectedDonut: state.selectedDonut.concat(action.payload)}
    },
    setModal:(state, action) => {
      state.showModal = action.payload
    },
    setIngredients: (state, action) => {
      //write this somewhere!!!!
      return {
        ...state, 
        ingredients: state.ingredients.concat(action.payload)}
    },
  },
  
  extraReducers: () => {}
   
});

export const getUserSigninStatus = (state) => state.pizza.signedInUser
export const getSelectedDonut = (state) => state.pizza.selectedDonut
export const getModal = (state) => state.pizza.showModal
export const getIngredients = (state) => state.pizza.ingredients

export const {setUserSiginUser, setSelectedDonut, setModal, setIngredients} = pizzaSlice.actions

export default pizzaSlice.reducer;
