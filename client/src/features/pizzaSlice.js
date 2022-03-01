import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,

  reducers: {},
  
  extraReducers: () => {}
   
});

export default pizzaSlice.reducer;
