import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) ?? null,
    orderInfo: null,
    loading: false,
    orderId: null,
    error: null
};

export const orderSlice = createSlice({
    reducers: {
        setShippingAddress: (state, { payload }) => {
            state.loading = false;
            state.shippingAddress = payload;

            localStorage.setItem('shippingAddress', JSON.stringify(payload));
        },
        setError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        setLoading: state => {
            state.loading = true;
        }
    },
    name: 'order',
    initialState
});

export const { setShippingAddress, setError } = orderSlice.actions;

export default orderSlice.reducer;
